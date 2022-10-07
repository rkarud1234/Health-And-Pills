### 목차

1. Google 소셜 로그인
2. Kakao 소셜 로그인

## 1. Google 소셜 로그인

### 1.1. [Google API 콘솔](https://console.cloud.google.com) 프로젝트 생성
Google API Console에 접속해 새 프로젝트를 생성합니다.     
![image](https://user-images.githubusercontent.com/84266499/194394158-16456192-da13-4611-b65f-656fdcaf2e28.png)

### 1.2. OAuth 동의 화면에서 애플리케이션 생성     
![image](https://user-images.githubusercontent.com/84266499/194394477-718236bc-a028-49cd-a7fc-5d4095dcdc50.png)

### 1.3. 앱 정보 등록
![image](https://user-images.githubusercontent.com/84266499/194394908-1e798577-e3e7-48e1-b2bc-c3a2b553ecac.png)

### 1.4. 액세스 범위 지정
![image](https://user-images.githubusercontent.com/84266499/194395179-501ff791-d1f2-41a2-8655-5a6995ed6edb.png)    
![image](https://user-images.githubusercontent.com/84266499/194395275-a365e3f2-ab7b-4fa0-8986-df766ca9f238.png)    


### 1.5. OAuth 클라이언트 인증 정보 생성
![image](https://user-images.githubusercontent.com/84266499/194395578-e2f56114-3c6b-41a5-a6d8-54e77e5f36bd.png)   
![image](https://user-images.githubusercontent.com/84266499/194395674-e5aa1fab-4c83-41ad-95a8-50922ff8b392.png)    

![image](https://user-images.githubusercontent.com/84266499/194395734-db4a5ad1-157b-4da7-bdf0-e9e4771418e7.png)
![image](https://user-images.githubusercontent.com/84266499/194395902-ef3d4e8c-4dd4-47ba-b9ff-2b4052b82b52.png)    

생성완료    
![image](https://user-images.githubusercontent.com/84266499/194396005-79a9e02c-0544-46ae-ad8e-9541a65fd97a.png)    

인증 정보를 확인할 수 있습니다.    
![image](https://user-images.githubusercontent.com/84266499/194396147-85ee299a-1b49-4d07-99c4-9a8d594ef245.png)


## 2. Kakao 소셜 로그인

### 2.1. [카카오 개발자 센터](https://developers.kakao.com) 애플리케이션 추가
카카오 개발자 센터에 접속해 애플리케이션을 추가합니다.      
![image](https://user-images.githubusercontent.com/84266499/194397056-97826091-6caa-4421-89bb-cbba751b45a7.png)    

### 2.2. 플랫폼 설정
내 애플리케이션의 플랫폼을 설정해줍니다     
![image](https://user-images.githubusercontent.com/84266499/194397196-927cfcd9-d900-48c4-8f53-7b0ccce7b359.png)    

### 2.3. 카카오 로그인 활성화 및 리다이렉트 URI 설정
![image](https://user-images.githubusercontent.com/84266499/194397394-6e5a1687-26a3-40a6-b041-03f175153eb1.png)    
![image](https://user-images.githubusercontent.com/84266499/194397843-0cd38ba4-7f68-4022-aeae-6db2cc9ac301.png)    


![image](https://user-images.githubusercontent.com/84266499/194397984-2e9eb2f9-3ed7-408c-b437-3cd60f62c624.png)
REST API 키를 ClientID로 사용하면 됩니다.

# application.yml 설정
```yml
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: {GoogleClientID}
            client-secret: {GoogleClientSecret}
            scope:
              - email
              - profile
          kakao:
            client-id: {KakaoClientID}
            redirect-uri: http://주소/login/oauth2/code/kakao #기본 제공 클라이언트가 아니기 때문에 반드시 적어줘야 함. 그래서 아무거나 적어도 되지만 되도록 규칙에 맞추기
            client-authentication-method: POST
            authorization-grant-type: authorization_code #oauth2의 코드 방식 사용
            scope:
              - profile_nickname
              - account_email
            client-name: Kakao
        provider:
          kakao:
            authorization_uri: https://kauth.kakao.com/oauth/authorize
            token_uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user_name_attribute: id
```
