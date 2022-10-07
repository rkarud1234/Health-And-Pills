### 1. dump를 위한 스크립트 생성
```sh
FILE_NAME=DB_`date "+%Y%m%d%H%M"`
docker exec ce90 /usr/bin/mysqldump -uroot --password=He110W0r1d@ --all-databases > /home/ubuntu/dump/${FILE_NAME}.sql
```

### 2. cron에 일정 등록
- systemctl status cron : 크론탭 데몬 확인
- select-editor : 크론탭 편집기 선택
- crontab -e : 크론 편집
```sh
0 6 * * * sudo sh /home/ubuntu/dump.sh
```
매일 6시마다 덤프파일 생성됨
- crontab -l : 저장된 크론탭 내용 확인

![image](https://user-images.githubusercontent.com/84266499/194392418-876b37df-dc37-4087-a2e4-41d58c2bd143.png)

- /home/ubuntu/dump 경로에 덤프파일 잘 생성되어있다
![image](https://user-images.githubusercontent.com/84266499/194392503-416f4bf5-db5c-47a5-ba0e-0fde0015e0f1.png)
