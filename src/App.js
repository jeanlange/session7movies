import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import MovieCard from './MovieCard.js';

class App extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    console.log('I am mounting!');
    // go get data from the movies API
    axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b6fbc7f3f313bd395902af464ef47262`)
      .then(res => {
        // console.log(res);
        const movies = res.data.results;
        this.setState({ movies });
      })
  }

  render() {
    console.log('rendering!');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello, world!
          </p>
          { this.state.movies.map(movie => <MovieCard movie={movie} key={movie.id} />) }
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
