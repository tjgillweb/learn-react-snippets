import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seed: 40,
      ignoreProp: 0
    }
    this.seedGenerator = () => this.setState({seed: Number.parseInt(Math.random()*100)});
    this.ignoreProp = () => this.setState({ignoreProp: Math.random()});
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.seedGenerator}>Generate Seed</button>
        <button onClick={this.ignoreProp}>Ignore Prop</button>
        <Counter 
          seed={this.state.seed} 
          ignoreProp={this.state.ignoreProp} 
        />
      </div>
    );
  }
}

export default App;
