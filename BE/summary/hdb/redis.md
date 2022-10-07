
# Redis 설치 & 실행 & CLI

### Redis 설치

```bash
brew install redis
```

### Redis 실행

```bash
redis-server
```

### 도커 Redis 설치 & 실행

```docker
docker run -p 6379:6379 --name redis_boot -d redis
```

- 포트번호 : `6379`
- 이름 : `redis_boot`

### 도커 Redis CLI

```docker
docker exec -i -t redis_boot redis-cli
```

### Redis CLI

- `exists 키값` : 키 값의 존재 개수
- `type 키값` : 저장 구조 형식
- `ttl 키값` : 해당 키의 남은 유효시간 확인
- `get 키값`  : 데이터는 serialize된 값으로 저장 확인
- `hkeys 키값` : Hash 내부에 저장된 값 Key값 확인
- `hget 키값` : 해당 key 값에 저장된 데이터 확인

### 스프링 데이터 Redis

```java
// build.gradle
implementation 'org.springframework.boot:spring-boot-starter-data-redis'
```

- 스프링 데이터 Redis 의존성 추가
