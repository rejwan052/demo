import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

interface HelloProps {
    foo: string;
    bar: number;
}

function Hello(props: HelloProps) {
    return (
        <div>
            <div>{props.foo}</div>
            <div>{props.bar}</div>
        </div>
    );
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
          <Hello foo="test" bar={123}/>
      </div>
    );
  }
}

export default App;
