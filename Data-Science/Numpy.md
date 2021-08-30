# Numpy 라이브러리

> https://numpy.org/doc/stable/index.html

## Numpy란?

> Python에서 과학적 컴퓨팅을 위한 기본 패키지
>
>  다차원 배열 객체, 다양한 파생 객체(예: 마스크된 배열 및 행렬) 및 수학, 논리, 모양 조작, 정렬, 선택, I/O를 포함한 배열에 대한 빠른 작업을 위한 일련의 루틴을 제공

## ndarray

> Numpy의 핵심인 다차원 행렬 자료구조(N-dimension array)
>
> c기반으로 벡터화된 코드로 이루어져 있고, 루프나 인덱싱이 없어서 빠른 연산이 가능하다.

### List vs ndarray

**Python 리스트**

- 여러 타입의 원소 가능
- 동적할당
- linked List
  - 메모리 용량이 크고 속도가 느림
- 벡터화 연산 불가

**NumPy ndarray**

- 동일 타입의 원소끼리만 가능
- 정적할당(사이즈 변경 시 Array 삭제 후 새로운 Array 생성)
- 연속된 메모리 사용
  - 메모리 최적화, 계산 속도 향상
- 벡터화 연산 가능

![ListVsNdarray](http://jakevdp.github.io/images/array_vs_list.png)



### Numpy의 차원

- 1차원 축(행) : axios 0 => Vector
- 2차원 축(열) : axios 1 => Matrix
- 3차원 축(채널) : axios 2 => Tensor(3차원 이상)



### [Numpy Basic](./Numpy_basic.ipynb)

> 기초 문법 jupyter notebook 정리
