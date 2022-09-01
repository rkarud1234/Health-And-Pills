## KNN(K-Nearest Neighbor)

새로운 데이터가 주어졌을 때 **기존 데이터 가운데 가장 가까운 K개 이웃의 정보로 새로운 데이터 예측**

1. 모든 User 데이터와의 거리 계산
2. **가까운 거리**에 있는 K개의 User 데이터 찾기
3. `평균`, `빈도` 등으로 아이템 선호도 예측



##### 장단점

- 추천 리스트에 새로운 사용자 또는 아이템이 오더라도 안정정으로 진행이 가능하다.
- 방법이 간단하고 직관적이어서 접근이 용이하다.
- 유저 기반의 방법 및 속도, 메모리가 많이 든다.
- 희소성으로 인한 제약이 발생한다. (유사한 이웃이 사용한 경험이 없으면 추천 불가능하다)



> KNN 알고리즘 예시 코드

```python
#new_user 데이터가 새롭게 주어졌을때, 기존 데이터 가운데 가장 가까운 3개의 이웃정보로 새로운 데이터값 예측하기
k = 3
new_user = [9, 1, 0]
neighbor_list = [
    [2, 8, 1],
    [7, 2, 9],
    [8, 1, 7],
    [1, 9, 1],
    [9, 2, 9],
    [1, 8, 2]
]

prediction = predict(user, neighbor_list, k)
print('Predcitc %f.' % (prediction))
```

```python
def predict(user, neighbor_list, k):
    k_near_neighbors = get_neighbors(user, neighbor_list, k)
    
    predict_candidate = [row[-1] for row in k_near_neighbors]
    print('predict_candidate : ', predict_candidate)
    # 최빈도 구하기
    prediction = max(set(predict_candidate), key = predict_candidate.count)
    return prediction
```

```python
def get_neighbors(user, neighbor_list, k):
    distances = list()
    for neighbor in neighbor_list:
        dist = euclidean_distance(user, neighbor)
        distances.append((neighbor, dist))
    distances.sort(key=lambda tup: tup[1])
    
    print('neighbors distances : ', distances)
    
    near_neighbors = list()
    for i in range(k):
        near_neighbors.append(distances[i][0])
    
    print('near neighbors : ', near_neighbors)
    return near_neighbors
```

```python
def euclidean_distance(user, neighbor):
	distance = 0.0
    for i in range(len(user) - 1):
        distance += (user[i] - neighbor[i]) ** 2
    return sqrt(distance)
```