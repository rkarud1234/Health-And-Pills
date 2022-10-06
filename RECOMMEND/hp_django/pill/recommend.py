from itertools import chain
import random
from time import strftime
import pandas as pd
import numpy as np
from pill.models import Pill, PillReview, Functionality, Nutrient, PillNutrient, PillFunctionality
from user.models import UserProfile
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime


# 20대 남자를 위한추천
def recommendUser(birthday,gender):
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
    ratings = PillReview.toDataFrame(cols=['user_id','pill_id','pill_review_score'])

    x = ratings.copy()
    y = ratings['user_id']
    
    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.25)

    merged_ratings = pd.merge(x_train, users)

    users = users.set_index('user_id')

    g_mean = merged_ratings[['pill_id','gender','age_group','pill_review_score']].groupby(['pill_id','gender','age_group'])['pill_review_score'].mean().reset_index().sort_values(ascending=False, by='pill_review_score')
    
    
    return pk_list_to_queryset(g_mean['pill_id'][:10])

# 인기 제품 추천
def recommendBest(userId):
    ratings = PillReview.toDataFrame(cols=['user_id','pill_id','pill_review_score'])
    pill_mean = ratings.groupby(['pill_id'])['pill_review_score'].mean()
    pill_sort = pill_mean.sort_values(ascending=False)
    recommend_pills = pill_sort.loc[pill_sort.index].reset_index()

    return pk_list_to_queryset(recommend_pills['pill_id'][:10])

# 나와 유사한 사용자 추천
def recommendCustom(user_id):
    ratings = PillReview.toDataFrame(cols=['user_id','pill_id','pill_review_score'])
    ratings = ratings.groupby(['user_id','pill_id'])['pill_review_score'].mean().reset_index()
    # print(ratings)

    x = ratings.copy()
    y = ratings['user_id']

    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.25)
    
    rating_matrix = x_train.pivot(index='user_id', columns='pill_id', values='pill_review_score')

    matrix_dummy = rating_matrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)
    try:
        user_pill = matrix_dummy.loc[user_id].copy()
    except:
        user_pill = matrix_dummy.iloc[1].copy()
        for i in range(1, len(user_pill)):
            user_pill[i] = 0.0

    for pill in rating_matrix.columns:
        if pd.notnull(user_pill.loc[pill]):
            user_pill.loc[pill] = 0
        else:
            user_pill.loc[pill] = CF_knn(user_id, pill, rating_matrix, user_similarity, 29)

    pill_sort = user_pill.sort_values(ascending=False).drop(1)
    return pk_list_to_queryset(pill_sort.reset_index()['pill_id'][:10])
    
# 현재 보고있는 영양제와 비슷한 영양제
def recommendItem(user_id, pill_id):

    nutrients = list(PillFunctionality.objects.filter(pill=pill_id).values())
    nutri_list = []
    for nutri in nutrients:
        nutri_list.append(nutri['functionality_id'])
    
    test = list(PillFunctionality.objects.filter(functionality_id__in=nutri_list).exclude(pill=pill_id).order_by('?')[:10].values())
    pill_pk_list= []
    for t in test:
        pill_pk_list.append(t['pill_id'])


    return pk_list_to_queryset(pill_pk_list)

# 생년월일 -> 연령대
def get_age_group(birthday):
    19971002
    birth = datetime.strptime(birthday, '%Y%m%d').date()
    today = datetime.now().date()
    year = today.year - birth.year
    if today.month < birth.month:
        year -= 1
    elif today.month == birth.month and today.day < birth.day:
        year -= 1
        
    return (year//10) * 10 # 20

# 영양제 pk리스트 뽑은거 장고 쿼리셋으로 변경
def pk_list_to_queryset(pk_list):
    result = []
    for id in pk_list:
        result.append(Pill.objects.filter(pill_id=id).values())
    return list(chain(*result))   


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