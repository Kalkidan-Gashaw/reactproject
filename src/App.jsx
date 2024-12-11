import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import GenreFilter from './GenreFilter';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        setLoading(true);

        
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=35d5215d6e77553afe256302a6dcf3db`
        );
        setMovies(moviesResponse.data.results);

       
        const genresResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=35d5215d6e77553afe256302a6dcf3db`
        );
        setGenres(genresResponse.data.genres);

        setLoading(false);
      } catch (error) {
        setError('Error fetching movies and genres. Please try again later.');
        setLoading(false);
      }
    };
    fetchMoviesAndGenres();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=35d5215d6e77553afe256302a6dcf3db&query=${searchQuery}`;
  
      
      if (selectedGenres.length > 0) {
        apiUrl += `&with_genres=${selectedGenres.join(',')}`;
      }
  
      const response = await axios.get(apiUrl);
      if (response.data.results.length === 0) {
        setError('No movies found. Please try a different search term or genre.');
      } else {
        setMovies(response.data.results);
        setError(null);
      }
      setLoading(false);
    } catch (error) {
      setError('Error searching for movies. Please try again later.');
      setLoading(false);
    }
  };

  const handleGenreSelect = async (genreId) => {
    setSelectedGenres(genreId ? [genreId] : []);
  
    try {
      setLoading(true);
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=35d5215d6e77553afe256302a6dcf3db`;
  
      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      } else {
        apiUrl += `&sort_by=popularity.desc`;
      }
  
      const response = await axios.get(apiUrl);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching movies. Please try again later.');
      setLoading(false);
    }
  };
  return (
    <div className='container-fluid my-4 mx-3'>
      <div className='head'>
        <h1 className='title  '>MovieReact</h1>
        <SearchBar
        
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setError={setError}
        />
      </div>
      <h2 className='topic'>popular movies</h2>
      <GenreFilter  genres={genres} selectedGenres={selectedGenres} onGenreSelect={handleGenreSelect} />
      {loading ? (
        <div className="d-flex justify-content-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : error ? (
        <div className="alert alert-danger mt-4">{error}</div>
      ) : (
        <div className=' row'>
          {movies.map((movie) => (
            <MovieCard className='title' movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;