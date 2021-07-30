[TOC]

# React

> 공식문서(한글) : https://ko.reactjs.org/

## React의 시작

변화가 일어나면 Mutation을 하지 말자. 대신 데이터가 바뀌면 뷰를 날려버리고 새로 만들어버리면 어떨까? 에서 시작

그러나, 매번 새로운 뷰를 만들면 성능적으로 문제 발생

따라서 Virtual DOM 사용



## Virtual DOM

> https://www.youtube.com/watch?v=BYbgopx44vo
>
> https://ko.reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom

Virtual DOM 은 UI의 이상적인 또는 “가상”적인 표현을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 “실제” DOM과 동기화하는 프로그래밍 개념입니다. 이 과정을 [재조정](https://ko.reactjs.org/docs/reconciliation.html)이라고 합니다.

변화가 일어나면 실제 DOM에 새로운 것을 넣는 것이 아니라 자바스크립트로 이루어진 가상의 DOM에 한번 렌더링을 하고, 기존의 DOM과 비교해서 바뀐부분만 업데이트를 하는 방식



## React 시작하기

```bash
npx create-react-app my-app
cd my-app
npm start
```

Third-Party Library로는 react-router, redux, nextjs, Gatsby 등이 있다.





---



## JSX

> React.createElement(component, props, ...children) 함수에 대한 문법적 설탕을 제공
>
> 사용하지 않아도 되지만 사용하면 매우 편리하다.

### 특성

1. JSX에 표현식 포함 가능
2. JSX도 표현식이다.
3. 속성 정의 가능 (camelCase 프로퍼티 명명규칙 사용)
4. 자식 정의 가능 (태그가 비어있다면 /> 를 이용해 바로 닫아주어야 한다.)
5. 주입공격 방지 (React DOM은 JSX에 삽입된 모든 값을 렌더링 하기 전에 이스케이프하므로, 명시적으로 작성되지 않은 내용은 주입X)
6. JSX는 객체를 표현



## JSX 이해하기

> https://ko.reactjs.org/docs/jsx-in-depth.html#gatsby-focus-wrapper

#### JSX

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

#### JavsScript

```javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

JSX파일은 다음과 같이 JS로 변환된다.

어떻게 변환되는지는 https://babeljs.io/repl 에서 확인가능



### 1) Element 타입 지정

> JSX 태그의 첫 부분은 React element의 타입을 결정

#### 1. React가 스코프 내에 존재해야 한다.

​	`<Foo /> `를 JSX 태그로 사용하기 위해서는 반드시 import 필요

​	`import React from 'react';`

#### 2. JSX 타입을 위한 점 표기법 사용

​	 `MyComponents.DatePicker`와 같이 MyComponents에 있는 컴포넌트 직접 사용 가능

#### 3. 사용자 정의 컴포넌트는 반드시 대문자로 시작

​	`<div>` 나 `<span>` 과 같은 내장 컴포넌트를 제외한 사용자가 정의한 타입들은 대문자로 시작해야한다.

​	소문자로 시작하면 html 태그로 인식해서 문제 발생

```jsx
import React from 'react';

// 잘못된 사용법입니다! 아래는 컴포넌트이므로 대문자화 해야 합니다.
function hello(props) {
  // 올바른 사용법입니다! 아래의 <div> 사용법은 유효한 HTML 태그이기 때문에 유효합니다.
  return <div>Hello {props.toWhat}</div>;
}

// 올바른 사용법입니다. 아래는 컴포넌트이므로 대문자로 시작해야 합니다.
function Hello(props) {
  // 올바른 사용법입니다! 아래의 <div> 사용법은 유효한 HTML 태그이기 때문에 유효합니다.
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 잘못된 사용법입니다! React는 <hello />가 대문자가 아니기 때문에 HTML 태그로 인식하게 됩니다.
  return <hello toWhat="World" />;
  // 올바른 사용법입니다! React는 <Hello />가 대문자로 시작하기 때문에 컴포넌트로 인식합니다.
  return <Hello toWhat="World" />;
}
```

#### 4. 실행 중에 타입 선택

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 잘못된 사용법입니다! JSX 타입은 표현식으로 사용할 수 없습니다.
  return <components[props.storyType] story={props.story} />;
  // 올바른 사용법입니다! 대문자로 시작하는 변수는 JSX 타입으로 사용할 수 있습니다.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

components를 사용하고 싶으면 다음과 같이 대문자로 시작하는 변수를 따로 지정해서 사용



### 2) JSX에서 prop 사용

#### 1. JavaScript Expressions as Props

> 자바스크립트 표현식 prop으로 사용 가능

```jsx
<MyComponent foo={1 + 2 + 3 + 4} />
```

#### 2. 문자열 리터럴

> 아래와 같이 "", {}로 표현 가능

```jsx
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

#### 3. Props의 기본값은 “True”

> 아무것도 넘기지 않으면 default: True

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

#### 4. 속성 펼치기

> props에 객체를 이미 갖고있으면, ...를 "전개" 연산자로 사용해 전체 객체를 그대로 넘겨줄 수 있다.
>
> 전개 연산자는 유용하지만 불필요한 prop을 컴포넌트에 넘기거나 유효하지 않은 HTML 속성들을 DOM에 넘기기도 한다.
>
> 꼭 필요할 때만 사용하기 권장

```jsx
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```



### 3) JSX에서 자식 다루기

> 여는 태그와 닫는 태그가 있는 JSX 표현에서 두 태그 사이의 내용은 `props.children`이라는 특수한 prop으로 넘겨집니다. 자식을 넘기는 방법은 여러 가지가 있습니다.

#### 1. 문자열 리터럴

> JSX는 각 줄의 처음과 끝에 있는 공백을 제거합니다. 빈 줄 역시 제거합니다. 태그에 붙어있는 개행도 제거되며 문자열 리터럴 중간에 있는 개행은 한 개의 공백으로 대체

#### 2. JSX를 자식으로 사용

```jsx
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
{/* HTML태그에서도 사용 가능 */}
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

```jsx
render() {
  // 리스트 아이템들을 추가적인 엘리먼트로 둘러쌀 필요 없습니다!
  return [
    // key 지정을 잊지 마세요 :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

#### 3. JavaScript 표현식을 자식으로 사용

```jsx
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

#### 4. 함수를 자식으로 사용

#### 5. boolean, null, undefined는 무시됩니다.

> 렌더링 되지 않을뿐 다음과같이 조건식으로 사용 가능

```jsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

`showHeader`가 `true`일때만 `<Header />` 렌더링

>  출력하고 싶으면 문자열로 전환해야한다.

```jsx
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```



---



## 컴포넌트

> **모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.**

컴포넌트는 함수형과 클래스형이 있다. 최근에는 주로 함수형 컴포넌트를 사용하지만 클래스형 코드를 수정할 일이 생길 수 있어서 알아두어야 한다.

### 선언방식

#### 함수형

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 클래스형

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```



### Component Lifecycle

> https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/



### React Hook

> React 16.8에서 새로 추가된 개념 / class를 작성하지 않고 React 기능 사용 가능
>
> Hooks API Reference : https://ko.reactjs.org/docs/hooks-reference.html

