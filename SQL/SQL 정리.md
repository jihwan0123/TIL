# SQL 정리

### DML

> 데이터 조작 언어

- SELECT, INSERT, UPDATE, DELETE, MERGE, CALL, EXPLAIN PLAN, LOCK TABLE

### DDL

>  데이터 정의 언어

- CREATE, DROP, ALTER, RENAME, COMMENT, TRUNCATE

### DCL

> 데이터 제어 언어

- GRANT, REVOKE

### TCL

> Transaction 제어 언어

- COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION



## SQL 문법

```mysql
-- 사용할 DB 선택
USE database_name;

-- 테이블 확인
SHOW TABLES;
-- STATUS확인
SHOW TABLE STATUS;

-- 테이블에 무슨 열이 있는지 확인
DESC table_name;
DESCRIBE table_name;

-- 데이터 가져오기
SELECT * FROM table_name WHERE 조건식;

WHERE LIKE 'x%' -- %는 아무거나, `_`는 한글자만
```



#### 서브쿼리

>  쿼리 문 안에 또 쿼리문이 들어가는것

- 서브쿼리 결과가 둘 이상이면 에러 발생

```mysql
SELECT *
FROM city
-- 서울이라는 이름이라는 것은 알고있지만 CountryCode는 모르는 경우 이렇게 사용한다.
WHERE CountryCode = ( SELECT CountryCode FROM city WHERE Name = 'Seoul')

-- ANY: 서브쿼리의 결과를 하나만 만족해도 됨
-- ALL: 모두 만족시켜야함
WHERE Population > ANY ( SELECT Population FROM city WHERE District = 'New York')
```



#### ORDER BY

- ASC (오름차순: default), DESC(내림차순)



#### LIMIT 

> 출력 갯수 제한



#### GROUP BY

>  그룹으로 묶어주는 역할

- AVG, MIN, MAX, COUNT, COUNT(DISTINCT), STDEV, VARIANCE 등등과 함께 사용
- `AS` : 별칭(Alias)
- HAVING : GROUP BY 이후에 나와야 함 (조건 제한)
- ROLLUP : 총합 또는 중간합계가 필요한 경우 사용(WITH ROLLUP)

```mysql
SELECT CountryCode, MAX(Population) AS 'Population'
FROM city
GROUP BY CountryCode, Name WITH ROLLUP
HAVING MAX(Population) > 800000
```



#### JOIN

- 여러 테이블에서 가져온 레코드를 조합하여 하나의 테이블이나 결과 집합으로 표현

```mysql
SELECT  *
FROM city
JOIN country ON city.CountryCode = country.Code
JOIN countrylanguage ON city.CountryCode = countrylanguage.CountryCode
```





#### 내장함수

##### LENGTH()

> 길이

##### CONCAT()

> 문자열 결합, 문자열중 하나라도 NULL 이면 NULL 반환

##### LOCATE()

> 문자열이 처음으로 나타나는 위치를 찾아서 해당위치 반환
>
> MySQL에선 INDEX 첫번쨰가 1번

##### LEFT(), RIGHT()

> 문자열의 왼쪽/오른쪽부터 지정한 개수만큼의 문자 반환

##### LOWER(), UPPER()

##### REPLACE()

```mysql
-- MSSQL문자열에서 MS라는 문자를 My로 교체
SELECT REPLACE('MSSQL', 'MS', 'My')
```

##### TRIM()

> 공백제거

- BOTH, LEADING, TRAILING : 양쪽, 앞, 뒤

##### FORMAT()

> 123123 -> 123,123

##### FLOOR(), CEIL(), ROUND()

> 내림, 올림, 반올림

##### SQRT(), POW(), EXP(), LOG()

##### SIN(), COS(), TAN()

##### ABS(), RAND()

> 절대값, 랜덤(0<= n <= 1)

##### NOW(), CURDATE(), CURTIME(), DATE(), MONTH(), DAY(), HOUR(), MINUTE(), SECOND()

> 날짜,시간 관련

##### MONTHNAME, DAYNAME

##### DAYOFWEEK , DAYOFMONTH, DAYOFYEAR

> 몇번째 일인지 반환

##### DATE_FORAMT()



#### 테이블 복사

```mysql
-- city와 동일한 city2 테이블 생성
CREATE TABLE city2 AS SELECT * FROM city;
```

