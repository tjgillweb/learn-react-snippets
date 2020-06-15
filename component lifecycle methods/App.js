import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seed: 40
    }
    this.seedGenerator = () => this.setState({seed: Number.parseInt(Math.random()*100)})
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.seedGenerator}>Generate Seed</button>
        <Counter seed={this.state.seed} />
      </div>
    );
  }
}

export default App;
