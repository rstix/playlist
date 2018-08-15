import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import queryString from 'query-string-es5';

let defaultStyle = {
  color: '#444',
};

let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My favourite',
        songs: [
          { name: 'Beat it', duration: 1234 },
          { name: 'Nina', duration: 7524 },
          { name: 'Lucie', duration: 5231 },
        ],
      },
      {
        name: 'Morning run',
        songs: [
          { name: 'Beat it', duration: 1234 },
          { name: 'Boom', duration: 7524 },
          { name: 'Lucie', duration: 5231 },
        ],
      },
      {
        name: 'Chill',
        songs: [
          { name: 'Beat it', duration: 1234 },
          { name: 'Nina', duration: 7524 },
          { name: 'Lucie', duration: 5231 },
        ],
      },
      {
        name: 'Trip',
        songs: [
          { name: 'Beat it', duration: 1234 },
          { name: 'Nina', duration: 7524 },
          { name: 'Lucie', duration: 5231 },
        ],
      },
    ],
  },
};

class PLaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '40%' }}>
        <h2> {this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HourCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, playlist) => {
      return songs.concat(playlist.songs);
    }, []);
    let totalDuration = allSongs.reduce((duration, song) => {
      return duration + song.duration;
    }, 0);
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '40%' }}>
        <h2> {Math.round(totalDuration / 3600)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          onKeyUp={e => this.props.onTextChange(e.target.value)}
        />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
        <img src={playlist.imageURL} style={{width: '160px'}}/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => (
            <li>{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {}, filterString: '' };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(parsed)

    if(!accessToken) return

    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          user:{
            name: data.display_name
          }
        });
      });

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          playlists: data.items.map(item => ({
            name: item.name,
            imageURL: item.images[0].url,
            songs: []
          }))
        });
      });
  }
  render() {
    let playlistsToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist =>
            playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h1 style={defaultStyle}>
              {this.state.user.name}
              's playlist
            </h1>
            <PLaylistCounter playlists={playlistsToRender} />
            <HourCounter playlists={playlistsToRender} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {playlistsToRender.map(playlist => (
              <Playlist playlist={playlist} />
            ))}
          </div>
        ) : (
          <button
            onClick={() => {
              if(window.location.href.includes('localhost')){
                window.location = 'http://localhost:8888/login'
              }else{
                'https://rstix-playlist-backend.herokuapp.com/login'
              }
              }}
            style={{
              padding: '20px',
              margin: '20px',
              fontSize: '20px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {' '}
            Sign in with Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
