import React from 'react';
import './index.css'

const MovieCard = ({ movie }) => {
  return (
    <div className="col-md-3 mb-4 col-sd-5">
      <div className="card h-100 car">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-body">
          <h5 className="card-title text-white">{movie.title}</h5>
          <p className="card-text text-white"><span>Release Date:</span> {movie.release_date}</p>
          <p className="card-text text-white text-justify">{movie.overview}</p>
          <p className="card-text text-white">
            <span className=""><span>Rating:</span> {movie.vote_average}/10</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;