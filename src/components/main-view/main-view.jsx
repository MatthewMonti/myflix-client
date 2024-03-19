import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movies-flex-6e317721b427.herokuapp.com/api/movies",
     {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            _id: doc._id,
            Title: doc.Title,
            Release: doc.Release,
            Actors: [doc.Actors.join(', ')],
            Rated: doc.Rated,
            Rating: doc.Rating,
            Description: doc.Description,
            Genre: {
              Name: doc.Genre.Name,
              Description: doc.Genre.Description
            },
            Director: {
              Name: doc.Director.Name,
              Bio: doc.Director.Bio,
              Birth: doc.Director.Birth,
              Death: doc.Director.Death
          },
            Image: doc.Image,
            Featured: doc.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center"> 
        
      {!user ? (
        <>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          OR
          <SignupView />
        </>
      ) : selectedMovie ? (
        <>
        <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        <MovieView
          style={{ border: "10px solid green" }}
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
        ) : (
        <>
             <h1>Select Film Poster to Learn More</h1>
             <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          {movies.map((movie) => (
            <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
            />
            ))}
        </>
      )}
    </Row>
);
};