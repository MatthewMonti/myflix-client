import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../search-bar/search-bar"; // Corrected import statement
import { MovieCard } from "../movie-card/movie-card";
import {FilterCard} from "../filter-card/filter-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserInfoComponent } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../../index.scss'
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterText, setFilterText] = useState('');



  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movies-flex-6e317721b427.herokuapp.com/movies",
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

  const handleFilterTextChange = (text) => {
    setFilterText(text);
  };

  // Filter movies based on filterText
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filterText.toLowerCase())
  );


console.log(movies)

  return (
    <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            localStorage.removeItem('token');
          }}
    />
 
      <Row>
         <Routes>
          <Route
            path="/signup"
            element={
              <>
              <h4>Create Account</h4>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
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
                  <Navigate to="/" replace />
                ) : (
                  <Col>
                    <UserInfoComponent key={user._id} user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
              <h3 id="intro">Welcome to Reel Cinema Database</h3>
              <img className="icon" src="https://cdn.dribbble.com/users/1913706/screenshots/4353135/reel-alwin.gif" alt="gif file old projector is running"/>

              <h4>Login</h4>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <Col>
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
            path="/"
            element={
              <Col md={5}>
              <h3 id="intro">Welcome to Reel Cinema Database</h3>
              <img className="icon" src="https://cdn.dribbble.com/users/1913706/screenshots/4353135/reel-alwin.gif" alt="gif file old projector is running"/>

              <h4>Login</h4>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </>
                )}
              </Col>

            }
          />   
          <Route
          path="/movies/Action"
          element={
            <>
            <h3 id="intro">Action Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Action")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
        
        <Route
          path="/movies/Adventure"
          element={
            <>
            <h3 id="intro">Adventure Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Adventure")
                    .sort((a, b) => a.Release.localeCompare(b.Release)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>

          }
        />
            <Route
          path="/movies/Anime"
          element={
            <>
            <h3 id="intro">Anime Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Anime")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>

          }
        />
        <Route
          path="/movies/Comedy"
          element={
            <>
            <h3 id="intro">Comedy Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Comedy")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
        <Route
          path="/movies/Drama"
          element={
            <>
            <h3 id="intro">Drama Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Drama")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
        <Route
          path="/movies/Family"
          element={
            <>
            <h3 id="intro">Family Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Family")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
        <Route
          path="/movies/Family"
          element={
            <>
            <h3 id="intro">Family Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Family")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
           <Route
          path="/movies/Historical"
          element={
            <>
            <h3 id="intro">Historical Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Historical")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
        <Route
          path="/movies/Horror"
          element={
            <>
            <h3 id="intro">Horror Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Horror")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
            <Route
          path="/movies/Musical"
          element={
            <>
            <h3 id="intro">Musical Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Musical")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
             <Route
          path="/movies/Mystery"
          element={
            <>
            <h3 id="intro">Mystery Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Mystery")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
               <Route
          path="/movies/Sci-Fi"
          element={
            <>
            <h3 id="intro">Sci-Fi Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Sci-Fi")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
                      <Route
          path="/movies/War"
          element={
            <>
            <h3 id="intro">War Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "War")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
                )}
            </>
          }
        />
        <Route
          path="/movies/Western"
          element={
            <>
            <h3 id="intro">Western Films</h3>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Western")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col key={movie._id}>
                        {movie.Title && movie.Image && movie.Director && ( // Add additional checks as needed
                          <FilterCard
                            user={user}
                            movie={movie}
                          />
                        )}
                      </Col>
                    ))}
                </Row>
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
                  <Navigate to="/" replace />
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
                <br />
                <br /> 
                <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
                />
                <br />
                <br />
                <h5>Film Category</h5>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/movies/Action">
                    Action
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Adventure">
                    Adventure
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Anime">
                    Anime
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Comedy">
                    Comedy
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Drama">
                    Drama
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Family">
                    Family
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Historical">
                    Historical
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Horror">
                    Horror
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Musical">
                    Musical
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Mystery">
                    Mystery 
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Sci-Fi">
                    Science Fiction 
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
               {!user ? (
                  <Navigate to="/" />
                ): (
                  <>
                  {filteredMovies
                    .filter(movie => movie.Title) // Filter out movies with no title (you can adjust this condition as needed)
                    .sort((a, b) => a.Title.localeCompare(b.Title)) // Sort movies alphabetically by title
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
                        <MovieCard user={user} movie={movie} />
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