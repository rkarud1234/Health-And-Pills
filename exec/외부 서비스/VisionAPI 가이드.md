> [공식 가이드 문서](https://cloud.google.com/vision/docs/ocr?hl=ko)     

![image](https://user-images.githubusercontent.com/84266499/194398453-bf5987ab-4abc-42c4-880b-13c40fdf35d7.png)
프로젝트 설정을 통해 사용자 인증 정보를 설정합니다.    

![image](https://user-images.githubusercontent.com/84266499/194398724-30a2058b-cb0f-4a1a-94ef-49cec4639080.png)     
그러면 json 형식의 인증 키를 발급받을 수 있습니다.     
이 인증키를 `GOOGLE_APPLICATION_CREDENTIALS`라는 이름의 환경 변수로 설정해줘야 합니다.      

일단 이 파일을 배포 서버로 옮겨줍니다.     
![image](https://user-images.githubusercontent.com/84266499/194398980-e9020794-c40b-4822-af0f-40a0c13922da.png)     

Spring Boot 서버에서 Vision API를 호출하기 때문에, 이 서버가 실행되는 도커 컨테이너 안으로 이 파일을 옮겨줘야 합니다.     

하지만 지금 Ubuntu - Jenkins - Docker를 거치기 때문에 약간의 절차가 필요합니다.     

1. ubuntu에 있는 인증 키를 jenkins 디렉터리로 옮김
```sh
scp -o StrictHostKeyChecking=no ubuntu@${도메인}:/home/ubuntu/vision.json /var/jenkins_home/workspace/backend
```
2. jenkins로 복사해온 인증 키를 Docker 컨테이너로 옮김
```sh
docker cp /var/jenkins_home/workspace/backend/vision.json ${컨테이너명}:/home/vision.json
```
3. DockerFile에서 환경변수 설정을 추가합니다.
```sh
ENV GOOGLE_APPLICATION_CREDENTIALS /home/vision.json
```
