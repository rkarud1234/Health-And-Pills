
1. SQL 연산순서★★★
From Where Group by Having Select Order by
DML
- Alter, create, modify, drop
- Rollback, commit
- Grant, revoke
SQLD 알짜 요약
- Select, insert, update, delete
DDL
TCL
DCL
2. Distinct
어떤 컬럼값들의 중복을 제거 한 결과를 출력한다.
- Select distinct col from table;
- Select distinct col1, col2 from table; 의 경우엔 col1 과 col2의 값이 모두 같지 않은 것 만
출력한다. <주의> -
3. Alias★★
Select 절에서 사용가능, where 절에서는 사용 불가!!!
Select col as name from table; = select col name from table;
4. concat
Select col1 + col2 + col3 from table; (SQL Server)
Select col1 || col2 || col3 from table; (oracle)
Select concat(col1, col2) from table; *연산자가 2개!! 기억!!
5. 논리연산자
1) NOT - ~가 아니다
2)AND–A 그리고 B(둘다 만족)
3)OR–A 또는 B(둘중 하나만 만족해도 OK!)
6. SQL 연산자★
A between B and C – B <= A <= C
A in (1,2,3) – A = 1 or A = 2 or A = 3
A like ‘_ble*’ – A의 값중 2,3,4번째 값이 ble 인 모든 데이터 출력
7. escape
and email like '@_%' escape '@' *아무 문자나 가능
8. rownum, top
oracle에선 where절 옆에 rownum SQL server의 경우 select 옆에 top
9. null의 정의★★★
모르는값, 정의되지 않은값 (공백이나 0 과는 다르다) 산술연산에서 null이 들어가게 되면 null이 출력된다. *null + 2, null * 4, null + null 모두 결과는 null
조건절에 null이 들어가게되면 false를 반환 함. *null=null, null=2
집계함수(sum, count, min, max...) 에서 null은 데이터 대상에서 제외 된다. 정렬시에는 오라클에서는 가장큰 것이 되고, SQL Server에서는 가장 작은 값이 된다.
Nvl(col, 0) – col이 널이면 0 반환 아니면 col 반환 Nvl2(col,1,0) – col이 null이면 0 반환, 아니면 1 반환 Isnull(col,0) – col이 널이면 0 반환 아니면 col 반환 Nullif(col,0) – col이 0이면 null 반환, 아니면 col 반환 Coalesce(col1, col2, col3..) – null 아닌 첫번째 값 반환
10. 정렬★★
- 느려질 수 있다.
- 가장 마지막에 실행
- null이 어디에 오는지..
컬럼명으로 정렬, 앞의 기준이 같을 때 그 다음 컬럼으로 정렬 기본값은 asc(오름차순), desc는 내림차순
Order by col1, col2 desc

출력순서(번호)로 정렬, select 절의 출력 순서로 정렬 순서를 지정 Order by 2, 1 desc
11. 숫자함수
Round(222.45, 1) 소수점 둘째자리에서 반올림하여 첫째자리까지 출력 Round(225.67, 0) 소수점 첫째자리에서 반올림하여 정수만 출력
-1 파라미터는 1의 자리에서 반올림하여 정수를 출력
Ceil(oracle) / ceiling(SQL Server) 올림함수, 파라미터 사용법은 round와 같음 Floor 버림 함수, 파라미터 사용법은 round와 같음
12. 문자함수★
Lower, upper – 소문자로, 대문자로
Trim, ltrim, rtrim – 양쪽공백제거, 왼쪽, 오른쪽 공백제거
Lpad,rpad– 특정 자리를 정하고, 왼쪽 / 오른쪽 의 공백을 채워주는 함수
- Select lpad(‘A’, 5, ‘*’) from dual;
- ****A, rpad면 A****
Substr – SELECT SUBSTR(‘korea’, 2, 2) FROM DUAL; or 이 출력 Instr - SELECT INSTR('CORPORATE FLOOR','PO') AS idx FROM DUAL;
13. 날짜함수★
To_char – 날짜형 데이터를 문자로 출력
- Select to_char(sysdate, ‘YYYY-MM-DD’) from dual;
4 가 출력
To_date – 문자형 데이터를 날짜형으로 출력
- select to_date('2022-09-22') from dual;
sysdate (oracle), getdate() (SQL Server)
13. 조건문★
Decode
- select decode(col1,’A’,1,’B’,2,3) from dual;
- col이 A면 1,B면 2, 아니면 3
case
case when col = ‘A’ then 1
when col = ‘B’ then 2
else 3 end;
case col when ‘A’ then 1
when ‘B’ then 2 else 3 end;
서로 같다

14. 집계함수★★
Count, min, sum, max 등
- -
null은 포함되지 않는다
(1, null, 2, 3, null) 의 데이터를 기준으로 결과는 다음과 같다.
◼ Count() – 3 ◼ Sum() – 6 ◼ Avg() – 2 ◼ Min() – 1 ◼ Max() – 3 Col2 Col3 null 1
   Col1
null 232
1 null null
            Select sum(col1 + col2 + col3) from dual;
여기에서 먼저 sum을 생각하지말고 col1 + col2 + col3 을 먼저 생각해보면 첫번째 행은 null + null + 1이기에 null이 반환되고, 마지막 세번째 행도 마찬가지다.
그러므로, 두번째 행의 2+3+2의 값인 7이 결과가 된다.
반대로, sum(col1) + sum(col2) + sum(col3)의 값은 3 + 3 + 3 이므로 9가 출력이 된다. 이 차이를 알아야 한다.
15. 그룹바이 group by
집약기능을 가지고 있음 (다수의 행을 하나로 합침) Group by 절에 온컬럼만select절에올수있음
16. join★★
Natural join
- 반드시 두 테이블 간의 동일한 이름, 타입을 가진 컬럼이 필요하다.
- 조인에 이용되는 컬럼은 명시하지 않아도 자동으로 조인에 사용된다.
- 동일한 이름을 갖는 컬럼이 있지만 데이터 타입이 다르면 에러가 발생한다.
- 조인하는 테이블 간의 동일 컬럼이 SELECT 절에 기술 되도 테이블 이름을 생략해야 한 다.
- select department_id 부서, department_name 부서이름, location_id 지역번호, city 도시 from departments
natural join locations
where city = 'Seattle';
Using
- USING 절은 조인에 사용될 컬럼을 지정한다.
- NATURAL 절과 USING 절은 함께 사용할 수 없다.
- 조인에 이용되지 않은 동일 이름을 가진 컬럼은 컬럼명 앞에 테이블명을 기술한다.

- 조인 컬럼은 괄호로 묶어서 기술해야 한다.
- select department_id 부서번호, department_name 부서, location_id 지역번호, city 도시
from departments
join locations using (location_id);
left outer join
- from table a left outer join table b
on a.col = b.col 이것과 같은 오라클 sql 문법은
- from table a, table b
where a.col = b.col(+)
join 순서
- from a,b,c
a와 b가 join 되고, 그리고 c와 join 된다.
17. 서브쿼리★★★
Select – 스칼라 서브쿼리
From – 인라인뷰 (메인 쿼리의 컬럼 사용 가능) Where – 중첩 서브쿼리
Group by – 사용 불가
Having – 중첩 서브쿼리
Order by – 스칼라 서브쿼리
In – 서브쿼리 출력값들 or 조건
Any/some – 서브쿼리 출력값들중 가장 작거나 큰 값과 비교
All – any/some과 반대 개념
Exists – 서브쿼리내 select 절엔 뭐가 와도 상관 없다. Row가 있으면 true, 없으면 false
18. 집합연산자★★
Union 정렬O 중복제거O 느리다 Intersect 정렬O 교집합 느리다 Minus (except) 정렬O 차집합 느리다 Union all 정렬X 중복제거X 빠르다
19. DDL★★
Truncate – drop & create, 테이블 내부 구조는 남아 있으나 데이터가 모두 삭제 됨 Drop – 테이블 자체가 없어짐 (당연 데이터도 없음)
Delete – 데이터만 삭제
Rollback, commit 이랑 항상 같이 나옴

20. DML★
Insert – 데이터 넣는 명령, insert into 테이블 (col1, col2, col3..) values (‘11’, ‘22’, ‘33’..); - values를 기준으로 좌우의 괄호속 개수가 맞는지
update – 데이터의 특정 행의 값을 변경 (delete & insert) - update 테이블 set col = ‘값’ where col1 = ‘조건’;
delete – 데이터의 특정 행을 삭제
- delete from 테이블 where col = ‘조건’;
merge – 특정 데이터를 넣을 때 해당 테이블 키값을 기준으로 있으면 update, 없으면 insert를 한 다. (최근 기출)
위 문제 모두 commit, rollback, savepoint 와 주로 함께 출제 된다.
21. 제약조건★★★
PK – not null + unique
- 테이블당 하나의 PK를 가질 수 있음 (하나라는게 컬럼이 아님, 복합키 가능)
Notnull– 해당 컬럼에 null이 올 수 없음 Unique – 해당 컬럼에 중복값이 올 수 없음
22. DCL
Grant, revoke 문법
- GRANT시스템권한명[,시스템권한명...|롤명] TO유저명[,유저명...|롤명...
|PUBLIC | [WITH ADMIN OPTION];
- REVOKE { 권한명 [, 권한명...] ALL} ON 객체명 FROM {유저명 [, 유저명...] | 롤명(ROLE) |
PUBLIC} [CASCADE CONSTRAINTS];
- Role은 객체
23. VIEW
- 독립성, 편의성, 보안성 - SQL을 저장하는 개념
24. 그룹함수
- roll up
- cube
- groupingsets
- grouping
어떤 결과가 나오고 어떤 함수를 사용 했는지에 대한 문제 기출
