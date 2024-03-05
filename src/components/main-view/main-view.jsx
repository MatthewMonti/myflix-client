import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movies-flex-6e317721b427.herokuapp.com/api/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc.key,
            Title: doc.Title,
            Release: doc.Release,
            Actors: [doc.Actors.join(', ')],
            Rated: doc.Rated,
            Rating: doc.Rating,
            Description: doc.Description,
            Genre: [
              doc.Genre.Name,
              doc.Genre.Description,
            ],
            Director: [
              doc.Director.Name,
              doc.Director.Bio,
              doc.Director.Birth,
              doc.Director.Death
            ],
            ImagePath: doc.ImagePath,
            Featured: doc.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
