# 추천시스템과 추천 알고리즘
-   추천시스템: 아이템 바탕으로 어떤 추천을 할지, 플랫폼 상에서 유저에게 추천 결과를 어떻게 보여줄지 전체 시스템을 총괄하는 것
-   **추천 알고리즘: 아이템 Pool(전체) > 특정 후보군 생성 > 후보군 바탕으로 Intentions or Filtering > Ranking**

## 1. Contents-based Recommender System(컨텐츠 기반 추천시스템)

**사용자가 과거에 좋아했던 아이템 파악 후 그 아이템과 비슷한 아이템 추천**

1.  특정 문서들에서 유저가 과거에 접했고 만족했던 아이템 점수화
2.  유저가 좋아했던 아이템 중 일부/전체와 비슷한 아이템 선정
    -   이때 아이템 간의 점수, 유저-아이템 간의 프로파일링을 통해 아이템 선정
3.  선정된 아이템을 유저에게 추천

## 2. Collaborative Filtering(협업 필터링)

**비슷한 성향/취향을 가진 다른 유저가 좋아한 아이템을 현재 유저에게 추천하는 것**   
➡️ 간단하면서도 수준 높은 정확도 나타내 많이 사용됨

1.  유저 A와 유저 B 모두 같은 아이템에 대해 비슷한/같은 평가를 했다
2.  이때, 유저 A는 다른 아이템에도 비슷한 호감 나타냄
3.  따라서 유저 A, B의 성향은 비슷할 것이므로 다른 아이템을 유저 B에게도 추천

### 3. Hybrid Recommender System

-   Content-based와 Collaborative Filtering의 장단점 보완 (Combined RS ➡️ Output)
-   Collaborative Filtering은 새로운 아이템에 대한 추천 부족
    -   유저 A, B가 동일하게 좋아했어야하고 유저 A가 좋아하는 후보군을 추천해주는 것이므로 특정 후보군이 정해져있을 수 밖에 없다
        
        ➡️ Content-based 기법이 Collaborative Filtering의 **cold-start** 문제에 도움 줄 수 있음