import React from 'react';

const GenreFilter = ({ genres, selectedGenres, onGenreSelect }) => {
  const handleGenreSelect = (e) => {
    const genreId = e.target.value ? parseInt(e.target.value) : null;
    onGenreSelect(genreId);
  };


  const desiredGenres = genres.filter((genre) =>
    ['Romance', 'Action', 'Fantasy', 'Sci-Fi'].includes(genre.name)
  );

  return (
    <div>
      
      <select value={selectedGenres[0] || ''} onChange={handleGenreSelect} className="Genre">
        <option value="">Genres</option>
        {desiredGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;