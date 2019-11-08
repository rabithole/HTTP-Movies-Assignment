import React from 'react';
import { Link } from 'react-router-dom';
// import Movie from './Movie';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  // console.log(props);
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      <Link to={`/update-movie/${props.movie.id}`}>
        <button>Update Movie</button>
      </Link>
    </div>
  );
};

export default MovieCard;
