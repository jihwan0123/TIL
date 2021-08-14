[TOC]

# 파이썬으로 시작하는 데이터 사이언스

> https://www.boostcourse.org/ds112/joinLectures/28137
>
> https://colab.research.google.com/github/ 에서 Colab으로 실행 가능



## 1. 데이터 분석 환경 구성

### 설치

Anaconda, Jupyter Notebook



### Pandas

> 10 minutes to pandas
>
> https://pandas.pydata.org/docs/user_guide/10min.html
>
> Pandas Cheet Sheet
>
> https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf





## 2. 데이터 분석 준비하기

> [Pandas_Basic](./Pandas_basic.ipynb)



## 3. 서울 종합병원 분포 확인하기

### 초기 라이브러리, 폰트 호출

#### 라이브러리

```python
import pandas as pd # 파이썬의 엑셀과 유사한 라이브러리
import numpy as np # 고성능의 수치계산, 행렬이나 대규모 다차원 배열을 쉽게 처리하기 위한 라이브러리
import seaborn as sns # 데이터 시각화
```



#### 시각화를 위한 폰트 설정

```python
import matplotlib.pyplot as plt # 데이터 시각화 라이브러리
# Window의 한글 폰트 설정
plt.rc('font', family='Malgun Gothic')
plt.rc('axes', unicode_minus=False) # minus 폰트 깨짐 방지
# 그래프가 노트북 안에 보이게 하기 위해
%matplotlib inline

from IPython.display import set_matplotlib_formats
# 폰트가 선명하게 보이게 하기 위해
set_matplotlib_formats('retina')
```



#### Pandas 데이터 로드

```python
# read_csv로 불러온 파일을 df 변수에 담기
df = pd.read_csv("data/소상공인시장진흥공단_상가업소정보_의료기관_201909.csv", low_memory=False)
```



#### 데이터 미리보기

- df.shape 
  - 데이터 (행,열) 확인

- df.head(n) 
  - 앞에 n개
- df.tail(n) 
  - 뒤에 n개
- df.sample(n) 
  - 랜덤 n개



#### 데이터 요약하기

- df.info()
- df.columns 
  - 컬럼명만



#### 결측치

> 데이터 비어있는지 확인(True/False)

- df.isnull()
- isnull().sum()
  - 결측치 합 확인
- set_index()
  - DataFrame 내의 열 인덱스 설정
- reset_index()
  - 인덱스 reset



#### 컬럼명 변경하기

- df_null_count.columns = ["컬럼명", "컬측치수"]



#### 정렬하기

- df_null_count_top = df_null_count.sort_values(by="결측치수", ascending=False).head(10)
  - 결측치수 기준으로 내림차순 상위 10개 출력



#### 특정 컬럼만 부르기

- df["지점명"]

- df["컬럼명"].tolist()
  - 컬럼값만 가져오기



#### 제거하기

- df.drop(drop_columns, axis=1)
  - axis
    - 0: index, 1: columns



#### 기초 통계값 보기

- df.types : 데이터 types
- mean() : 평균
- median(), max(), min()
  - 중앙값, 최댓값, 최솟값
- count() : 갯수

- describe() : 데이터 요약
  - describe를 사용하면 데이터를 요약해 볼 수 있다. 기본적으로 수치형 데이터를 요약해서 보여준다.
  - 데이터의 갯수, 평균, 표준편차 ,최솟값, 1사분위수(25%), 2사분위수(50%), 3사분위수(75%), 최댓값을 볼 수 있다.

- df.describe(include="object") : 문자열 데이터타입 요약

- unique : 중복제거
- nunique : unique 결과 갯수

- value_counts() : 그룹화된 요약값 보기

- value_counts(normalize=True) : 비율까지 볼 수 있다.
- plot.barh() : 가로막대 그래프 그리기

- plot.pie() : 파이차트 그리기
  - 파이차트는 비율을 파악하기 힘들어서 오해의 소지가 있어 권장되지 않음.

- 그룹화된 요약
  - seaborn
    - pandas보다 더 예쁜 그래프를 그릴 수 있다.
  - sns.countplot(data=df, x="시도명")
  - 데이터가 크면 클수록 느리다는 단점이 있다.

- plot.bar(rot=0) 
  - rot(rotate) = 얼마만큼 label 값들을 회전시킬건지
  - grid=True  격자표시



### 데이터 색인하기

- df[df["상권업종중분류명"] == "약국/한약방"]
  - 상권업종중분류명이 약국/한약방인 데이터 가져오기
- df.loc()
  - 행과 열 함께 가져오기
- (df["상권업종소분류명"] == "약국") & (df["시도명"] == "서울특별시")
  - **pandas에서는 and 대신 & 사용**
- 데이터 변수에 담아서 사용할때는 .copy() 사용하기
  - 데이터 변경 시 원본 df 변경될 수 있다.

- 텍스트 데이터 색인하기 
  - `df_seoul_hospital["상호명"].str.contains("종합병원")`
    - 상호명이 종합병원인 것
  - `~df_seoul_hospital["상호명"].str.contains("종합병원")`
    - 아닌것

**데이터 전처리가 가장 시간이 오래걸리는 작업이다.**

- "꽃배달|의료기|장례식장|상담소|어린이집" 은 종합병원과 무관
- 의원으로 끝나는 데이터도 종합병원과 무관
- `df_seoul_hospital["상호명"].unique()` 를 통해서 데이터를 보며 전처리 작업 진행
