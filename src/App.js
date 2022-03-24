import React from 'react';
import './App.css';

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil</p>
  }
  return <p>The water would not boil</p>
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }

  handleCelsiusChange = (e) => {
    this.setState({
      temperature: e,
      scale: 'c'
    })
  }

  handleFahrenheitChange = (e) => {
    this.setState({
      temperature: e,
      scale: 'f'
    })
  }

  render() {
    const temperature = this.state.temperature;
    const celsius = this.state.scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = this.state.scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale={'c'} temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale={'f'} temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={celsius} />
      </div>
    );
  }
}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        {/* <BoilingVerdict celsius={parseFloat(temperature)} /> */}
      </fieldset>
    );
  }
}

class InputElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
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

class ExceptionName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'error',
      errors: ['err1', 'err2', 'err3']
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {

  }

  render() {
    const v = this.state.value;
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={v} onChange={this.handleChange}>
          {this.state.errors.map((err, index, arr) => {
            return <option key={index} value={err}>{err}</option>;
          })}
        </select>
      </form>
    );
  }
}

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      value: '',
      result: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  handleSubmit = (e) => {
    // console.log(this.state.isLoggedIn)
    if (this.state.value == '1234qwer!') {
      this.setState({
        isLoggedIn: true
      });
    }
    else {
      this.setState({
        result: 'Login failed',
        isLoggedIn: false
      })
    }
  }
  verifiedElement = () => {
    return (
      <div>Logged In</div>
    );
  }
  render() {
    return (
      this.state.isLoggedIn ? <div>
        {this.verifiedElement()}
      </div>
        :
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              ID : admin
            </label>
            <br />
            <label>
              PW :
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <input type="submit" value="Submit!!!" />
          </form>
          <textarea value={this.state.result} onChange={this.handleChange}></textarea>
        </div>
    );
  }
}

function ListItem(props) {
  return (
    <li>{props.value}</li>
  );
}

function NumberList(props) {
  return (
    <ul>
      {props.number.map((number) =>
        <ListItem key={number.toString()}
          value={number} />
      )}
    </ul>
  );
}
let numbers = [1, 2, 3, 4, 5];
const name = 'UC';
const element = <h1>Logview, {name}</h1>

function Form() {
  function handleSubmit(e) {
    e.preventDefault(); //합성이벤트 e, 이거 없으면 안돌아가는데 이해 안됨. 이래서 그냥 Hook을 쓰나봄
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      labelName: 'init'
    }
    this.handleClick = this.handleClick.bind(this); // 이건 뭐지 UC에서는 useState Hook을 써서 간편했던건가
  }
  handleClick() {
    // this.setState(prev => ({
    //   isToggleOn: !prev.isToggleOn
    // }));
    this.setState((state, props) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  //이걸로 사용할 것
  newHandleClick = () => {  // *클래스 필드 문법* - 위 생성자에서 handleClick메소드에 대해 바인딩 안하고 바로 사용하려면 이렇게..
    this.setState((state, props) => ({
      labelName: 'clicked'
    }))
  }

  //파라미터 방식은 이렇게.. 생성자에 바인딩 없이 화살표함수로..
  paramHandleClick(a, b) {
    console.log(a)
    // console.log(b)
    this.setState((state, props) => ({
      labelName: a
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <button onClick={this.newHandleClick}>
          {this.state.labelName}
        </button>
        {/* <button onClick={(e) => this.paramHandleClick('hi', e)}> */}
        <button onClick={() => this.paramHandleClick('hi')}>
          {this.state.labelName}
        </button>
      </div>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(
      //state에서 props를 쓸때 date : new Date() + props.어쩌구 ~ 이렇게 쓰지 않고 (state, props)로 파라미터 받아서 사용
      (state, props) => ({
        date: new Date()
      })
    );
  }

  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      {element}
      <Clock />
      {Form()}
      <Toggle />
      <NumberList number={numbers} />
      <AuthForm />
      <ExceptionName />
      <InputElement />
      <Calculator />
    </div>
  );
}

export default App;
