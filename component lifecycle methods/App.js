import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mount: true,
      seed: 40,
      ignoreProp: 0, 
      showErrorComponent: false
    }
    this.seedGenerator = () => this.setState({seed: Number.parseInt(Math.random()*100)});
    this.ignoreProp = () => this.setState({ignoreProp: Math.random()});
    this.mountCounter = () => this.setState({mount: !this.state.mount});
    this.toggleError = () => this.setState({showErrorComponent: !this.state.showErrorComponent})
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.seedGenerator}>Generate Seed</button>
        <button onClick={this.ignoreProp}>Ignore Prop</button>
        <button onClick={this.mountCounter}>(Un)Mount Counter</button>
        <button onClick={this.toggleError}>Toggle Error</button>
        { this.state.mount ? 
            <Counter 
              ignoreProp={this.state.ignoreProp} 
              seed={this.state.seed}
              showErrorComponent={this.state.showErrorComponent}
            />
          : null }
      </div>
    );
  }
}

export default App;
