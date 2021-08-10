# Python

> 🔍 새롭게 알게 된 내용 정리

## Zen of Python

> 이스터에그, 파이

```python
import this

The Zen of Python, by Tim Peters

Beautiful is better than ugly.											# 지저분한 것보다는 아름다운 것
Explicit is better than implicit. 										# 불분명한 것보다는 명확한 것
Simple is better than complex. 											# 복잡한 것보다는 단순한 것
Complex is better than complicated. 									# 난해한 것보다는 복잡한 것
Flat is better than nested. 											# 중첩된 것 보다는 단조로운 것
Sparse is better than dense. 											# 밀집된 것 보다는 여유로운 것
Readability counts. 													# 가독성은 중요하다.
Special cases aren't special enough to break the rules.					# 규칙을 깨야할 정도로 특별한 경우란 없다.
Although practicality beats purity.										# 실용성이 순수함을 이기더라도
Errors should never pass silently.										# 오류는 조용히 지나가지 않는다.
Unless explicitly silenced.												# 보고도 침묵하지 않는다면
In the face of ambiguity, refuse the temptation to guess.				# 모호한 경우에는 추측하지 마라
There should be one-- and preferably only one --obvious way to do it.	# 문제를 해결할 한가지 명백한 방법이 있어야 한다.
Although that way may not be obvious at first unless you're Dutch.		# 비록 당신이 우둔해서 처음에는 명백해 보이지 않을 수도 있겠지만
Now is better than never.												# 지금 하는 것이 안하는 것보다 낫다.
Although never is often better than right now.							# 하지 않는 것이 하는 것보다 나을때도 있지만
If the implementation is hard to explain, it's a bad idea.				# 설명하기 어려운 구현은 좋은 아이디어가 아니다.
If the implementation is easy to explain, it may be a good idea.		# 설명하기 쉬운 구현이라면 좋은 아이디어일 수 있다.
Namespaces are one honking great idea -- let's do more of those!		# 네임스페이스는 대단한 아이디어이다. - 자주 사용하자
```



### Namespace

>  namespace란 dict 형태로 이름을 저장하는 공간이다.

<img src="https://files.realpython.com/media/t.fd7bd78bbb47.png" style="zoom:50%;" />

```python
def func():
    global a # global로 선언하면 global의 네임스페이스 참조
    a = 1
    b = 2
    print(locals())
    print(globals())

a = 2
func()
```

```bash
{'b': 2} # LOCAL에는 b만 존재한다.
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x0000020B4C893550>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, '__file__': 'test.py', '__cached__': None, 'func': <function func at 0x0000020B4C7771F0>, 'a': 1} # GLOBAL에는 a가 2에서 1로 변경되어있다.
```

1. Built-In
   - print, sum, dict, abs, len, type 등등
2. Global
3. Enclosing
4. Local

4 -> 1 순서로 없으면 상위 네임스페이스를 참조한다. 밖에서는 안에 있는 namespace 참조 불가능



## itertools

> https://docs.python.org/ko/3/library/itertools.html
>
> `import itertools`

### chain(*p)

> chain('ABC', 'DEF') --> A B C D E F

### chain.from_iterable(*p)

> chain.from_iterable(['ABC', 'DEF']) --> A B C D E F

### combinations(p, r)

> iterable에서 원소 갯수가 r개인 조합
>
> cobinations('ABCD', 2) --> AB AC AD BC BD CD

### combinations_with_replacement(p,r) 

> iterable에서 원소 개수가 r개인 중복 조합 뽑기
>
> combinations_with_replacement('ABCD', 2) --> AA AB AC AD BB BC BD CC CD DD

### permutations(p[,r])

> iterable에서 원소 개수가 r개인 순열 뽑기(r을 지정하지 않으면 최대 길이)
>
> permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC

### product(p,q, [repeat=1])

> 데카르트 곱(cartesian product), 중첩된 for 루프와 동등합니다
>
> roduct('ABCD', repeat=2) --> AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD

#### ex) 전체 부분집합 구하기

```python
from itertools import chain, combinations

def powerset(iterable):
    "powerset([1,2,3]) --> () (1,) (2,) (3,) (1,2) (1,3) (2,3) (1,2,3)"
    s = list(iterable)
    return chain.from_iterable(combinations(s, r) for r in range(len(s)+1))
```

```bash
>>> list(powerset("abcd"))
[(), ('a',), ('b',), ('c',), ('d',), ('a', 'b'), ('a', 'c'), ('a', 'd'), ('b', 'c'), ('b', 'd'), ('c', 'd'), ('a', 'b', 'c'), ('a', 'b', 'd'), ('a', 'c', 'd'), ('b', 'c', 'd'), ('a', 'b', 'c', 'd')]
```

