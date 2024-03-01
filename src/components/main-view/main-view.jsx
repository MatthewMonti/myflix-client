import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-flex-6e317721b427.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            genre: movie.Genre,
            description: movie.Description,
            director: movie.Director,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (selectedMovie) {
    return (
      <MovieView book={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
          book={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedBook(newSelectedMovie);
          }}
        />
      ))}
    </div>
  ); 
};
