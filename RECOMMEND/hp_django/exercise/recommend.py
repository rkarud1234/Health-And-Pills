from codecs import ascii_encode
from time import strftime
from itertools import chain
import pandas as pd
import numpy as np
from exercise.models import Exercise, ExercisePart
from user.models import UserProfile,UserExercise
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

def get_age_group(birthday):
    birth = datetime.strptime(birthday, '%Y%m%d').date()
    today = datetime.now().date()
    year = today.year - birth.year
    if today.month < birth.month:
        year -= 1
    elif today.month == birth.month and today.day < birth.day:
        year -= 1

    return (year//10) * 10
    
def recommendUser(birthday, gender):
    queryset = UserProfile.objects.filter(user_profile_gender=gender)
    temp = []
    for t in queryset:      
        temp.append({
            'user_id': t.user_profile_id,
            'age_group':get_age_group(strftime(t.user_profile_birthday)),
            'gender': gender
        })
    users = pd.DataFrame(temp, columns=['user_id','age_group','gender'])
    users.set_index('user_id')

    ratings = UserExercise.toDataFrame(cols=['user_id','exercise_id','user_exercise_bookmark','user_exercise_doing','user_exercise_like'])
    queryset = UserExercise.objects.all()
    temp =[]
    for t in queryset:
        temp.append({
            'user_id': t.user_id,
            'exercise_id': t.exercise_id,
            'score': create_exercise_score(t.user_exercise_bookmark,t.user_exercise_doing,t.user_exercise_like)
        })
    ratings = pd.DataFrame(temp, columns=['user_id','exercise_id','score'])

    x = ratings.copy()
    y = ratings['user_id']
    
    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.25)

    merged_ratings = pd.merge(x_train, users)

    users = users.set_index('user_id')

    g_mean = merged_ratings[['exercise_id','gender','age_group','score']].groupby(['exercise_id','gender','age_group'])['score'].mean().reset_index().sort_values(ascending=False, by='score')

    
    return pk_list_to_queryset(g_mean['exercise_id'][:10])


def recommendBest():
    ratings = UserExercise.toDataFrame(cols=['user_id','exercise_id','user_exercise_bookmark','user_exercise_doing','user_exercise_like'])
    queryset = UserExercise.objects.all()

    temp =[]
    for t in queryset:
        temp.append({
            'user_id': t.user_id,
            'exercise_id': t.exercise_id,
            'score': create_exercise_score(t.user_exercise_bookmark,t.user_exercise_doing,t.user_exercise_like)
        })

    ratings = pd.DataFrame(temp, columns=['user_id','exercise_id','score'])
    exercise_mean = ratings.groupby(['exercise_id'])['score'].mean()
    exercise_sort = exercise_mean.sort_values(ascending=False)
    recommend_exercises = exercise_sort.loc[exercise_sort.index].reset_index()
    

    return pk_list_to_queryset(recommend_exercises['exercise_id'][:10])

def recommendCustom(user_id):
    ratings = UserExercise.toDataFrame(cols=['user_id','exercise_id','user_exercise_bookmark','user_exercise_doing','user_exercise_like'])
    queryset = UserExercise.objects.all()
    temp =[]
    for t in queryset:
        temp.append({
            'user_id': t.user_id,
            'exercise_id': t.exercise_id,
            'score': create_exercise_score(t.user_exercise_bookmark,t.user_exercise_doing,t.user_exercise_like)
        })
    ratings = pd.DataFrame(temp, columns=['user_id','exercise_id','score'])

    x = ratings.copy()
    y = ratings['user_id']
    
    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.25)
    
    rating_matrix = x_train.pivot(index='user_id', columns='exercise_id', values='score')

    matrix_dummy = rating_matrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)
    user_exercise = matrix_dummy.loc[user_id].copy()

    for pill in rating_matrix.columns:
        if pd.notnull(user_exercise.loc[pill]):
            user_exercise.loc[pill] = 0
        else:
            user_exercise.loc[pill] = CF_knn(32, pill, rating_matrix, user_similarity, 1)

    pill_sort = user_exercise.sort_values(ascending=False)
    return pk_list_to_queryset(pill_sort.reset_index()['exercise_id'][:10])

def recommendItem(user_id, exercise_id):
    exercise_part = list(ExercisePart.objects.filter(exercise=exercise_id).values())
    exercise_part_list = []
    for exp in exercise_part:
        print(exp)
        exercise_part_list.append(exp['exercise_part_category_id'])
    

    ratings = UserExercise.toDataFrame(cols=['user_id','exercise_id','user_exercise_bookmark','user_exercise_doing','user_exercise_like'])
    queryset = UserExercise.objects.all()
    temp =[]
    for t in queryset:
        temp.append({
            'user_id': t.user_id,
            'exercise_id': t.exercise_id,
            'score': create_exercise_score(t.user_exercise_bookmark,t.user_exercise_doing,t.user_exercise_like)
        })
    ratings = pd.DataFrame(temp, columns=['user_id','exercise_id','score'])

    x = ratings.copy()
    y = ratings['user_id']
    
    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.25)
    
    rating_matrix = x_train.pivot(index='user_id', columns='exercise_id', values='score')

    matrix_dummy = rating_matrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)
    user_exercise = matrix_dummy.loc[user_id].copy()

    for pill in rating_matrix.columns:
        if pd.notnull(user_exercise.loc[pill]):
            user_exercise.loc[pill] = 0
        else:
            user_exercise.loc[pill] = CF_knn(32, pill, rating_matrix, user_similarity, 1)

    pill_sort = user_exercise.sort_values(ascending=False)
    return pk_list_to_queryset(pill_sort.reset_index()['exercise_id'][:10])

# 운동에 관한 자체 스코어 생성
def create_exercise_score(user_exercise_bookmark,user_exercise_doing,user_exercise_like):
    rate1 = 1 if user_exercise_bookmark == 'Y' else 0
    rate2 = 2 if user_exercise_doing == 'Y' else 0
    rate3 = 3 if user_exercise_like == 'Y' else 0
    return rate1 + rate2 + rate3

# 영양제 pk리스트 뽑은거 장고 쿼리셋으로 변경
# def pk_list_to_queryset(pk_list):
#     result = []
#     for id in pk_list:
#         result.append(Exercise.objects.filter(exercise_id=id).values())
#     return list(chain(*result))  

def pk_list_to_queryset(pk_list): 
    return Exercise.objects.filter(exercise_id__in=pk_list)


# 정확도 RMSE를 계산하는 함수
def RMSE(self, y_true, y_pred):

    return np.sqrt(np.mean((np.array(y_true) - np.array(y_pred))**2))

# 모델별 RMSE를 계산하는 함수
def score(self, model):
    id_pairs = zip(x_test['user_id'],x_test['movie_id'])
    y_pred = np.array([model(user,movie) for (user,movie) in id_pairs])
    y_true = np.array(x_test['rating'])
    return self.RMSE(y_true, y_pred)


## 이웃 크기를 정해서 예측치 계산 하는  함수 KNN
def CF_knn(user_id, movie_id, ratings_matrix, user_similarity ,neighbor_size=0):
  if movie_id in ratings_matrix.columns:
    sim_scores = user_similarity[user_id].copy()
    movie_ratings = ratings_matrix[movie_id].copy()
    none_rating_idx = movie_ratings[movie_ratings.isnull()].index
    movie_ratings = movie_ratings.dropna()
    sim_scores = sim_scores.drop(none_rating_idx)

    if neighbor_size == 0:
      mean_rating = np.dot(sim_scores,movie_ratings) / sim_scores.sum()
    else:
      if len(sim_scores) > 1:
        neighbor_size = min(neighbor_size, len(sim_scores))
        sim_scores = np.array(sim_scores)
        movie_ratings = np.array(movie_ratings)
        user_idx = np.argsort(sim_scores)
        sim_scores = sim_scores[user_idx][-neighbor_size:]
        movie_ratings = movie_ratings[user_idx][-neighbor_size:]
        mean_rating = np.dot(sim_scores,movie_ratings) / sim_scores.sum()
      else:
        mean_rating = 3.0
  else:
    mean_rating = 3.0
  return mean_rating