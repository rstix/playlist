import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#444'
}

class Agregate extends Component {
  render(){
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2>Agregate component</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render () {
    return (
      <div>
      <input type="text"/>
      </div>
    )
  }
}

class Playlist extends Component {
  render () {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img src="" alt=""/>
        <h3>Playlist name</h3>
        <ul>
          <li>song 1</li>
          <li>song 2</li>
          <li>song 3</li>
        </ul>
      </div>
    )
  }
}

class App extends Component {
  render() {
    let name = 'Tom'
    return (
      <div className="App">
        <h1 style={defaultStyle}> Title {name} </h1>
        <Agregate/> 
        <Agregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
