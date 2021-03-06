# Python

> π μλ‘­κ² μκ² λ λ΄μ© μ λ¦¬

## βZen of Python

> μ΄μ€ν°μκ·Έ, νμ΄μ¬μ μ 

```python
import this

The Zen of Python, by Tim Peters

Beautiful is better than ugly.											# μ§μ λΆν κ²λ³΄λ€λ μλ¦λ€μ΄ κ²
Explicit is better than implicit. 										# λΆλΆλͺν κ²λ³΄λ€λ λͺνν κ²
Simple is better than complex. 											# λ³΅μ‘ν κ²λ³΄λ€λ λ¨μν κ²
Complex is better than complicated. 									# λν΄ν κ²λ³΄λ€λ λ³΅μ‘ν κ²
Flat is better than nested. 											# μ€μ²©λ κ² λ³΄λ€λ λ¨μ‘°λ‘μ΄ κ²
Sparse is better than dense. 											# λ°μ§λ κ² λ³΄λ€λ μ¬μ λ‘μ΄ κ²
Readability counts. 													# κ°λμ±μ μ€μνλ€.
Special cases aren't special enough to break the rules.					# κ·μΉμ κΉ¨μΌν  μ λλ‘ νΉλ³ν κ²½μ°λ μλ€.
Although practicality beats purity.										# μ€μ©μ±μ΄ μμν¨μ μ΄κΈ°λλΌλ
Errors should never pass silently.										# μ€λ₯λ μ‘°μ©ν μ§λκ°μ§ μλλ€.
Unless explicitly silenced.												# λ³΄κ³ λ μΉ¨λ¬΅νμ§ μλλ€λ©΄
In the face of ambiguity, refuse the temptation to guess.				# λͺ¨νΈν κ²½μ°μλ μΆμΈ‘νμ§ λ§λΌ
There should be one-- and preferably only one --obvious way to do it.	# λ¬Έμ λ₯Ό ν΄κ²°ν  νκ°μ§ λͺλ°±ν λ°©λ²μ΄ μμ΄μΌ νλ€.
Although that way may not be obvious at first unless you're Dutch.		# λΉλ‘ λΉμ μ΄ μ°λν΄μ μ²μμλ λͺλ°±ν΄ λ³΄μ΄μ§ μμ μλ μκ² μ§λ§
Now is better than never.												# μ§κΈ νλ κ²μ΄ μνλ κ²λ³΄λ€ λ«λ€.
Although never is often better than right now.							# νμ§ μλ κ²μ΄ νλ κ²λ³΄λ€ λμλλ μμ§λ§
If the implementation is hard to explain, it's a bad idea.				# μ€λͺνκΈ° μ΄λ €μ΄ κ΅¬νμ μ’μ μμ΄λμ΄κ° μλλ€.
If the implementation is easy to explain, it may be a good idea.		# μ€λͺνκΈ° μ¬μ΄ κ΅¬νμ΄λΌλ©΄ μ’μ μμ΄λμ΄μΌ μ μλ€.
Namespaces are one honking great idea -- let's do more of those!		# λ€μμ€νμ΄μ€λ λλ¨ν μμ΄λμ΄μ΄λ€. - μμ£Ό μ¬μ©νμ
```



### Namespace

>  namespaceλ dict ννλ‘ μ΄λ¦μ μ μ₯νλ κ³΅κ°μ΄λ€.

<img src="https://files.realpython.com/media/t.fd7bd78bbb47.png" style="zoom:50%;" />

```python
def func():
    global a # globalλ‘ μ μΈνλ©΄ globalμ λ€μμ€νμ΄μ€ μ°Έμ‘°
    a = 1
    b = 2
    print(locals())
    print(globals())

a = 2
func()
```

```bash
{'b': 2} # LOCALμλ bλ§ μ‘΄μ¬νλ€.
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x0000020B4C893550>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, '__file__': 'test.py', '__cached__': None, 'func': <function func at 0x0000020B4C7771F0>, 'a': 1} # GLOBALμλ aκ° 2μμ 1λ‘ λ³κ²½λμ΄μλ€.
```

1. Built-In
   - print, sum, dict, abs, len, type λ±λ±
2. Global
3. Enclosing
4. Local

4 -> 1 μμλ‘ μμΌλ©΄ μμ λ€μμ€νμ΄μ€λ₯Ό μ°Έμ‘°νλ€. λ°μμλ μμ μλ namespace μ°Έμ‘° λΆκ°λ₯



## βitertools

> https://docs.python.org/ko/3/library/itertools.html
>
> `import itertools`

### chain(*p)

> chain('ABC', 'DEF') --> A B C D E F

### chain.from_iterable(*p)

> chain.from_iterable(['ABC', 'DEF']) --> A B C D E F

### combinations(p, r)

> iterableμμ μμ κ°―μκ° rκ°μΈ μ‘°ν©
>
> cobinations('ABCD', 2) --> AB AC AD BC BD CD

### combinations_with_replacement(p,r) 

> iterableμμ μμ κ°μκ° rκ°μΈ μ€λ³΅ μ‘°ν© λ½κΈ°
>
> combinations_with_replacement('ABCD', 2) --> AA AB AC AD BB BC BD CC CD DD

### permutations(p[,r])

> iterableμμ μμ κ°μκ° rκ°μΈ μμ΄ λ½κΈ°(rμ μ§μ νμ§ μμΌλ©΄ μ΅λ κΈΈμ΄)
>
> permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC

### product(p,q, [repeat=1])

> λ°μΉ΄λ₯΄νΈ κ³±(cartesian product), μ€μ²©λ for λ£¨νμ λλ±ν©λλ€
>
> roduct('ABCD', repeat=2) --> AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD

#### ex) μ μ²΄ λΆλΆμ§ν© κ΅¬νκΈ°

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



## βpytest

> νμ΄μ¬ Unit Testλ₯Ό μν νλ μμν¬λ‘ λ΄μ₯λͺ¨λμΈ unittest λ³΄λ€ κ°λ¨ν΄μ μμ£Ό μ¬μ©λλ€.
>
> (https://docs.pytest.org/en/6.2.x/)
>
> νμ΄μ¬ κ³΅μλ¬Έμ μκ°: νμ€νΈλ₯Ό μμ±νκΈ°μ κ°νΈν λ¬Έλ²μ κ°μ§κ³  μλ μ μΌμμ λ¨μ νμ€νΈ νλ μμν¬. μμ, `assert func(10) == 42`.

```python
import pytest

# νμ€νΈν¨μ testλ‘ μμ, 
def test_case0():
    # ID  μ‘΄μ¬, PWλ μΌμΉ
    assert main.Login('test1', 'test1234') == True
    pass

def test_case1():
    # ID κ³΅λ
    assert main.Login('', 'test1234') == main.FIRST_CASE_RESULT
    pass

def test_case2():
    # ID μ‘΄μ¬, PW λΆμΌμΉ
    assert main.Login('test1', '1234') == main.SECOND_CASE_RESULT
    pass
```

- snake_caseλ₯Ό μ΄μ©νμ¬ ν¨μ μ μ
- `pytest -v` :λλ ν λ¦¬μ νμ€νΈ νμΌλ€ μν + μ€λͺ
- `pytest νμΌλͺ` : νΉμ  νμ€νΈνμΌλ§ μ€ν

- `pytest --maxfail = n` μ κ°μ΄ nλ²μ νμ€νΈ μ€ν¨ ν νμ€νΈ μ μ§ μ€μ  κ°λ₯

- `pytest-xdist` λ₯Ό μ΄μ©ν΄μ μ¬λ¬ νμ€νΈ λμμ μν κ°λ₯





## βμ κ·ννμ

> [μ κ·μ.md](./μ κ·μ.md)



## βCounter

> https://docs.python.org/ko/3/library/collections.html#collections.Counter
>
> `from collections import Counter`
>
> ν΄μ κ°λ₯ν κ°μ²΄λ₯Ό μΈκΈ° μν dict μλΈν΄λμ€
>
> dictλ‘ νλνλ μΈλ κ²μ Counterλ₯Ό μ΄μ©νλ©΄ νΈλ¦¬νκ² ν  μ μλ€.

```python
from collections import Counter

c = Counter()                           # Counter() κ°μ²΄ μμ±
c = Counter('gallahad')                 # Counter({'a': 3, 'l': 2, 'g': 1, 'h': 1, 'd': 1})
c = Counter({'red': 4, 'blue': 2})      # Counter({'red': 4, 'blue': 2})
c = Counter(cats=4, dogs=8)             # Counter({'dogs': 8, 'cats': 4})

Counter('abracadabra').most_common(3)  # [('a', 5), ('b', 2), ('r', 2)]
```

#### most_common(n)

> n κ°μ κ°μ₯ νν μμμ κ·Έ κ°μλ₯Ό κ°μ₯ νν κ²λΆν° κ°μ₯ μ μ κ² μμΌλ‘ λμ΄ν λ¦¬μ€νΈλ₯Ό λ°ν
>
> n μλ΅ μ λͺ¨λ  μμ λ°ν
