import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#444'
}

let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My favourite',
        songs: [{name:'Beat it', duration: 1234}, {name: 'Nina', duration: 7524}, {name: 'Lucie', duration: 5231}]
      },
      {
        name: 'Morning run',
        songs: [{name:'Beat it', duration: 1234}, {name: 'Boom', duration: 7524}, {name: 'Lucie', duration: 5231}]
      },
      {
        name: 'Chill',
        songs: [{name:'Beat it', duration: 1234}, {name: 'Nina', duration: 7524}, {name: 'Lucie', duration: 5231}]
      },
      {
        name: 'Trip',
        songs: [{name:'Beat it', duration: 1234}, {name: 'Nina', duration: 7524}, {name: 'Lucie', duration: 5231}]
      }
    ]
  }
}

class PLaylistCounter extends Component {
  render(){
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2> {this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}

class HourCounter extends Component {
  render(){
    let allSongs = this.props.playlists.reduce((songs,playlist)=>{
      return songs.concat(playlist.songs)
    },[])
    let totalDuration = allSongs.reduce((duration,song) =>{
      return duration + song.duration
    },0)
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '40%'}}>
        <h2> {Math.round(totalDuration/3600)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render () {
    return (
      <div>
      <input type="text" onKeyUp={e => this.props.onTextChange(e.target.value)}/>
      </div>
    )
  }
}

class Playlist extends Component {
  render () {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img src="" alt=""/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => <li>{song.name}</li> )}

        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {serverData: {},filterString: ''}
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        serverData: fakeServerData
      })
    },2000)
    // setTimeout(()=>{
    //   this.setState({
    //     filterString: 'morning'
    //   })
    // },2000)
  }
  render() {
    let playlistsToRender =this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist => 
        playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
      ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={defaultStyle}>
            {this.state.serverData.user.name}'s playlist 
          </h1>
          <PLaylistCounter playlists={playlistsToRender}/> 
          <HourCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistsToRender
            .map(playlist=>
              <Playlist playlist={playlist}/>
          )} 
        </div> : <h1 style={defaultStyle}> Loading... </h1>}
      </div>
    );
  }
}

export default App;
