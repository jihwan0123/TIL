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





## 조건부 렌더링

> 애플리케이션의 상태에 따라 컴포넌트 중 몇개만 렌더링하는 것

#### 1. if문 분기

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

#### 2. 중괄호 표현식

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

중괄호 안에 && 연산자를 이용해서 조건에 따라 렌더링 가능

#### 3. 조건부 연산자

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} /> // 로그인 상태면 로그아웃 버튼
        : <LoginButton onClick={this.handleLoginClick} /> // 아니면 로그인버튼 렌더링
      }
    </div>
  );
}
```

#### 4. 컴포넌트 렌더링 막기

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null; // 2. null을 반환하면 렌더링을 막을 수 있다.
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} /> {/* 1. 컴포넌트 props로 넘겨주고*/} 
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
```





## 리스트와 Key

> 일반적으로 컴포넌트안에서 리스트를 렌더링한다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}> // key 값을 설정해주지 않으면 경고가 표시된다.
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### Key

> Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.
>
> key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 한다.
>
> 보통 key값은 데이터의 ID를 사용한다. (ex. `key={todo.id}`)
>
> 안정적인 ID값이 없으면 항목의 index값 사용
>
> 배열 안에서 형제사이에서만 고유한 값을 가지면 된다. (전체범위에서 고유한 값일 필요는 없다.)

```jsx
function ListItem(props) {
  // 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 맞습니다! 배열 안에 key를 지정해야 합니다.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

#### JSX에 map() 포함시켜서 표현 가능

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
      {/* 다음과 같이 {} 안에 map() 함수 사용 가능*/}
    </ul>
  );
}
```





## Form

### textarea

> value 어트리뷰트 사용

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

### select

> 드롭다운 목록
>
> 최상단에서 value 어트리뷰트 사용
>
> multiple 옵션을 허용하면 value 어트리뷰트에 배열을 전달할 수 있다.

```jsx
<select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>
// multiple
<select multiple={true} value={['B', 'C']}>
```



```jsx
// file input 태그
<input type="file" />
```



### 다중 입력 제어하기

> 여러 input을 제어해야 할 때, 각 엘리먼트에 name 어트리뷰트를 추가하고 event.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해준다.

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```





## State 끌어올리기

> 종종 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있습니다. 이럴 때는 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋습니다. 
>
> React 애플리케이션 안에서 변경이 일어나는 데이터에 대해서는 “진리의 원천(source of truth)“을 하나만 두어야 합니다. 
>
> 보통의 경우, state는 렌더링에 그 값을 필요로 하는 컴포넌트에 먼저 추가됩니다. 
>
> 그러고 나서 다른 컴포넌트도 역시 그 값이 필요하게 되면 그 값을 그들의 가장 가까운 공통 조상으로 끌어올리면 됩니다. 
>
> 다른 컴포넌트 간에 존재하는 state를 동기화시키려고 노력하는 대신 하향식 데이터 흐름에 기대는 걸 추천합니다.

섭씨화씨 변환 예제 : https://codepen.io/gaearon/pen/WZpxpz?editors=0010

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```



![예제](https://ko.reactjs.org/ef94afc3447d75cdc245c77efb0d63be/react-devtools-state.gif)



## 합성 vs 상속

> React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋습니다.
>
> Facebook에서는 수천 개의 React 컴포넌트를 사용하지만, 컴포넌트를 상속 계층 구조로 작성을 권장할만한 사례를 아직 찾지 못했습니다.

### 컴포넌트에서 다른 컴포넌트를 담기

> React 엘리먼트는 단지 객체이기 때문에 다른 데이터처럼 `<Contacts />`, `<Chat /`> 같은 객체를 props로 넘겨줄 수 있다.
>
> className도 가능

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```



## React로 사고하기

### 1단계: UI를 컴포넌트 계층 구조로 나누기

> 단일책임원칙 : 하나의 컴포넌트는 한가지 일을 하는게 이상적이다.

![컴포넌트](https://ko.reactjs.org/static/eb8bda25806a89ebdc838813bdfa3601/6b2ea/thinking-in-react-components.png)

다음 예시는 5개의 컴포넌트로 이루어져 있으며 계층구조는 다음과 같다.

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`



### 2단계: React로 정적인 버전 만들기

정적 버전을 만들기 위해 **state를 사용하지 마세요**. state는 오직 상호작용을 위해, 즉 시간이 지남에 따라 데이터가 바뀌는 것에 사용합니다. 우리는 앱의 정적 버전을 만들고 있기 때문에 지금은 필요하지 않습니다.

앱을 만들 때, 상층부에 있는 컴포넌트부터 만드는 **하향식(top-down) 방법**과  하층부부터 만드는 **상향식(bottom-up)방법**이 있다. 

보통 하향식으로 만드는 게 쉽지만 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하기가 더 쉽다.



### 3단계: UI state에 대한 최소한의 (하지만 완전한) 표현 찾아내기

> 중복배제원칙 :  모든 형태의 정보 중복을 지양하는 원리

ex) TODO 리스트를 만든다고 하면, TODO 아이템을 저장하는 배열만 유지하고 TODO 아이템의 개수를 표현하는 state는 별도로 만들 필요가 없다.

TODO 갯수를 렌더링해야한다면 TODO 아이템 배열의 길이를 가져오면 된다.

어떤 게 state가 되어야 하는지는 다음 3가지 질문을 통해 결정할 수 있다.

1. **부모로부터 props를 통해 전달됩니까? 그러면 확실히 state가 아닙니다.**
2. **시간이 지나도 변하지 않나요? 그러면 확실히 state가 아닙니다.**
3. **컴포넌트 안의 다른 state나 props를 가지고 계산 가능한가요? 그렇다면 state가 아닙니다.**



### 4단계: State가 어디에 있어야 할 지 찾기

- state를 기반으로 렌더링하는 모든 컴포넌트를 찾으세요.
- 공통 소유 컴포넌트 (common owner component)를 찾으세요. (계층 구조 내에서 특정 state가 있어야 하는 모든 컴포넌트들의 상위에 있는 하나의 컴포넌트).
- 공통 혹은 더 상위에 있는 컴포넌트가 state를 가져야 합니다.
- state를 소유할 적절한 컴포넌트를 찾지 못하였다면, state를 소유하는 컴포넌트를 하나 만들어서 공통 오너 컴포넌트의 상위 계층에 추가하세요.



### 5단계: 역방향 데이터 흐름 추가하기

계층 구조의 하단에 있는 폼 컴포넌트에서 상층부의 state를 업데이트할 수 있어야한다.



## React Hook

> Hooks API Reference : https://ko.reactjs.org/docs/hooks-reference.html
>
> React 16.8에서 새로 추가된 개념
>
> class를 작성하지 않고 React 기능 사용 가능
>
> Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수
>
> React Conf 소개영상 : https://www.youtube.com/watch?v=dpw9EHDh2bM

### 1. 동기

#### 1. 컴포넌트 사이에서 상태 로직을 재사용하기 어렵습니다.

함수형 컴포넌트에서 상태가 필요한 경우 클래스 컴포넌트로 변경해야했다.

providers, consumers, 고차 컴포넌트(HOC), render props 그리고 다른 추상화에 대한 레이어로 둘러싸인 “래퍼 지옥(wrapper hell)“을 볼 가능성이 높다.

**Hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와준다.** 



#### 2. 복잡한 컴포넌트들은 이해하기 어렵습니다.

상태 관련 로직은 한 공간안에 묶여 있기 때문에 이런 컴포넌트들을 작게 분리하는 것은 불가능하며 테스트하기도 어렵다.

ex) `componentDidMount` 에서 데이터를 가져오는 작업 이외의 이벤트리스너를 설정

생명주기 메서드를 기반으로 쪼개는 것 보다는, **Hook을 통해 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나누는 방법을 사용할 수 있다. (구독 설정 및 데이터를 불러오는 것과 같은 로직)** 



#### 3. Class은 사람과 기계를 혼동시킵니다.

React 에서의 Class 사용을 위해서는 JavaScript의 `this` 키워드가 어떻게 작동하는지 알아야만 합니다. JavaScript의 `this`키워드는 대부분의 다른 언어에서와는 다르게 작동함으로 사용자에게 큰 혼란을 주었으며, 코드의 재사용성과 구성을 매우 어렵게 만들고는 했습니다. 

Class는 최근 사용되는 도구에서도 많은 문제를 일으킵니다. 예를 들어 Class는 코드의 최소화를 힘들게 만들고, 핫 리로딩을 깨지기 쉽고 신뢰할 수 없게 만듭니다. 우리는 코드가 최적화 가능한 경로에서 유지될 가능성이 더 높은 API를 제공하길 원하였습니다.

**Hook은 Class없이 React 기능들을 사용하는 방법을 제시합니다.** 개념적으로 React 컴포넌트는 항상 함수에 더 가깝습니다. Hook은 함수의 사용을 권장, Hook은 명령형 코드로 해결책을 찾을 수 있게 해주며 복잡한 함수형 또는 반응형 프로그래밍 기술을 배우도록 요구하지 않습니다.



### 2. Hooks 규칙

#### 1. 최상위에서만 호출

**최상위(at the top level)**에서만 Hook을 호출해야 합니다. 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하지 마세요.

#### 2. 함수 컴포넌트 내에서만 호출

**React 함수 컴포넌트** 내에서만 Hook을 호출해야 한다. 

일반 JavaScript 함수에서는 Hook을 호출해서는 안 됩니다. (Hook을 호출할 수 있는 곳은 직접 작성한 custom Hook뿐이다)

#### 3. Custom Hook의 시작은 use로





### 3. State Hook

> Count 예제
>
> JS [배열구조분해](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EB%B0%B0%EC%97%B4_%EA%B5%AC%EC%A1%B0_%EB%B6%84%ED%95%B4) 문법 이용해서 선언

```jsx
import React, { useState } from 'react';

function Example() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```







### 4. Effect Hook

> 리액트의 class 생명주기 메서드의 `componentDidMount`와 `componentDidUpdate`, `componentWillUnmount`가 합쳐진 것

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 같은 방식으로
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### `useEffect`가 하는 일은 무엇일까요?

useEffect Hook을 이용하여 우리는 리액트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말합니다. 리액트는 우리가 넘긴 함수를 기억했다가(이 함수를 ‘effect’라고 부릅니다) DOM 업데이트를 수행한 이후에 불러낼 것입니다. 위의 경우에는 effect를 통해 문서 타이틀을 지정하지만, 이 외에도 데이터를 가져오거나 다른 명령형(imperative) API를 불러내는 일도 할 수 있습니다.

#### `useEffect`를 컴포넌트 안에서 불러내는 이유는 무엇일까요?

 `useEffect`를 컴포넌트 내부에 둠으로써 effect를 통해 `count` state 변수(또는 그 어떤 prop에도)에 접근할 수 있다.

#### `useEffect`는 렌더링 이후에 매번 수행되는 걸까요?

네, 기본적으로 첫번째 렌더링과 이후의 모든 업데이트에서 수행됩니다. 마운팅과 업데이트라는 방식으로 생각하는 대신 effect를 렌더링 이후에 발생하는 것으로 생각하는 것이 더 쉬울 것입니다. 리액트는 effect가 수행되는 시점에 이미 DOM이 업데이트되었음을 보장합니다.

#### 조건부 effect 발생

> effect의 기본 동작은 모든 렌더링을 완료한 후 effect를 발생하는 것입니다. 이와 같은 방법으로 만약 의존성 중 하나가 변경된다면 effect는 항상 재생성됩니다.

```jsx
useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },[props.source]);
```



**effect를 실행하고 이를 정리(clean-up)하는 과정을 (마운트와 마운트 해제 시에)딱 한 번씩만 실행하고 싶다면, 빈 배열(`[]`)을 두 번째 인수로 넘기면 됩니다.**

```jsx
useEffect(() => {
	// mount시에 실행
    return () => {
        //unmount시에 실행
    }
  },[]);
```







### Multiple Effect (관심사 분리)

> useState마다 useEffect 설정
>
> Hook을 이용하면 생명주기 메서드에 따라서가 아니라 **코드가 무엇을 하는지에 따라** 나눌 수가 있습니다. 리액트는 컴포넌트에 사용된 *모든* effect를 지정된 순서에 맞춰 적용합니다.

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```



### 그 외 Hook API

> https://ko.reactjs.org/docs/hooks-reference.html
>
> useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect 등이 있다.



#### useEffect vs useLayoutEffect

> 실행 시점에 차이가 있으므로 필요할때 사용

| -         | useEffect                                                    | useLayoutEffect                                      |
| --------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| render    | 컴포넌트 렌더링 - 화면업데이트 - useEffect 실행              | 컴포넌트 렌더링 - useLayoutEffect실행 - 화면업데이트 |
| 사용 경우 | 일부 상태를 즉시 발생할 필요가 없을 경우<br />페이지에 시각적으로 영향을 주지 않는 무언가를 동기화 할 경우<br /><br />이벤트 핸들러를 설정하는 경우<br />모달 상자가 나타나거나 사라질 때 일부 상태를 재설정하는 경우 | 상태가 업데이트 될 때 요소가 깜빡이는 경우           |

##### UseEffect

![useEffeect](https://miro.medium.com/max/411/1*Q5DfWHYDNQdfnal-IvW05g.png)

##### UseLayoutEffect

![UseLayoutEffect](https://miro.medium.com/max/501/1*ZmRLve6CMNAuaQ5EFUa-8g.png)

