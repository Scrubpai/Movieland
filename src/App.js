import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=8f1ffbd8';



const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input type="text" placeholder="Search for movies" value={search} onChange={(e) => setSearch(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(search)}></img>
      </div>

      {
        movies?.length > 0 ? (
          <div className="container">
            {
              movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            }
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;