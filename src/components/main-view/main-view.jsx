import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserInfoComponent } from "../profile-view/profile-view";
import button from "react-bootstrap/button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import '../../index.scss'


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
      headers: { Authorization: `Bearer ${token}` },
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
            Featured: doc.Featured,
            url: doc.url
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

console.log(movies)

  return (
    <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
          }}
    />
 
      <Row>
         <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/home" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <UserInfoComponent key={user._id} user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                <h1 className="text-center"  >Reel Cinema Database</h1>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies = {movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <h1 className="text-center">Reel Cinema Database</h1>
               {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col className="mx-auto">The list is empty!</Col>
                ) : (
                <>
                  {movies.map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
                        <MovieCard 
                        user={user}
                        movie={movie} />
                      </Col>
                      ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
  
