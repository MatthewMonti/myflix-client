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
import '../../index.scss';
import "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Navigate } from 'react-router-dom'; 

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterText, setFilterText] = useState('');
  const userInput = "SearchTerm";
  const filteredText = userInput.toLowerCase();
  
  const handleLoggedIn = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setToken(authToken);
  };


  const fetchMovies = (token, setMovies) => {
    if (!token) {
      return;
    }
  
    fetch("https://movies-flex-6e317721b427.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            _id: doc._id,
            Title: doc.Title,
            Release: doc.Release,
            Actors: [doc.Actors.join(", ")],
            Rated: doc.Rated,
            Rating: doc.Rating,
            Description: doc.Description,
            Genre: {
              Name: doc.Genre.Name,
              Description: doc.Genre.Description,
            },
            Director: {
              Name: doc.Director.Name,
              Bio: doc.Director.Bio,
              Birth: doc.Director.Birth,
              Death: doc.Director.Death,
            },
            Image: doc.Image,
            Featured: doc.Featured,
            url: doc.url,
          };
        });
        setMovies(moviesFromApi);
      });
  };
  
  useEffect(() => {
    fetchMovies(token, setMovies);
  }, [token]);

  const handleFilterTextChange = (text) => {
    setFilterText(text);
  };

  const filteredMovies = movies.filter((movie) => {

const filterLowerCase = filterText.toLowerCase();





const RatedMovies = movies.filter(movie => movie.Rated === filterText);

const ReleaseYRSMovies = movies.filter(movies=> movies.Release == (filterText));

const RatingofMovies = movies.filter(movies => movies.Rating === (filterText))



// Check if Title, Director's Name, or any Actor's Name matches filterText
if (
  (movie.Genre && movie.Genre.Name && movie.Genre.Name.toLowerCase().includes(filterLowerCase)) ||
  movie.Title.toLowerCase().includes(filterLowerCase) ||
  (movie.Actors && movie.Actors.some(actor => actor.toLowerCase().includes(filterLowerCase))) ||
  (movie.Release.includes( filterText)) || // Convert Release to string for comparison
  (movie.Director.Name && movie.Director.Name.toLowerCase() === filterLowerCase) ||
  (movie.Rated && movie.Rated.toLowerCase() === filterLowerCase) ||
  (movie.Rating && movie.Rating.toLowerCase() === filterLowerCase) // Convert Rating to string for comparison
) {
  return true; // Include movie if any of the above conditions match
}

return false; // Exclude movie if none of the conditions match
});

  return (
    <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user')
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
                  <Navigate to="/movies" />
                ) : (
                  <Col mx={5}>
                    <SignupView onLoggedIn={handleLoggedIn} 
                    />
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
                  <Navigate to="/"  />
                ) : (
                  <Col md={5}>
                    <UserInfoComponent key={user._id} user={user} />
                  </Col>
                )}
              </>
            }
          />
<Route
  path="/"
  element={
    <Row>
      <Col lg={10}>
        <h1 id="intro">Welcome to Reel Cinema Database</h1>
        <img className="icon" src="https://cdn.dribbble.com/users/1913706/screenshots/4353135/reel-alwin.gif" alt="gif file old projector is running" />

        <h4>Login</h4>
        {user ? (
          <Navigate to="/movies" />
        ) : (
          <Col lg={8} >
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </Col>
        )}
      </Col>
    </Row>
  }
/>
          <Route
          path="/movies/Action"
          element={
            <>
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
            <h6 id="search-help" className="text-center">Search Within Action Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Action Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Action")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
            <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
            <h6 id="search-help" className="text-center">Search Within Adventure Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Adventure Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Adventure")
                    .sort((a, b) => a.Release.localeCompare(b.Release)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Anime Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Anime Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Anime")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Comedy Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Comedy Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Comedy")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
            <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Drama Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Drama Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Drama")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
             <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Family Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Family Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Family")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
            <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Historical Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Historical Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Historical")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Horror Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Horror Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Horror")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto"key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Musical Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Musical Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Musical")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Mystery Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Mystery Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Mystery")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
          path="/movies/Science Fiction"
          element={
            <>
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Science Fiction Films</h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">Science Fiction Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Science Fiction")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within War Films </h6>
            <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
                    Science Fiction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/War">
                    War
                  </Nav.Link>
                  <Nav.Link as={Link} to="/movies/Western">
                    Western
                  </Nav.Link>
                </Nav>
            <h2 className="text-center">War Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre War")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
              <h1 id="intro" className="text-center">Reel Cinema Database</h1>
              <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
              />
              <h6 id="search-help" className="text-center">Search Within Western Films</h6>
            <h5>Film Genre</h5>
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
              <Nav.Link as={Link} to="/movies/Science Fiction">
                Science Fiction
              </Nav.Link>
              <Nav.Link as={Link} to="/movies/War">
                War
              </Nav.Link>
              <Nav.Link as={Link} to="/movies/Western">
                Western
              </Nav.Link>
            </Nav>
            <h2 className="text-center">Western Films</h2>
            {!user ? (
                  <Navigate to="/" />
                ): (
                  <Row>
                  {movies
                    .filter(movie => movie.Genre.Name === "Genre Western")
                    .sort((a, b) => a.Title.localeCompare(b.Title)) //
                    .map((movie) => (
                      <Col className="mx-auto" key={movie._id}>
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
                  <Col >The list is empty!</Col>
                ) : (
                  <Col className="mx-auto">
                    <MovieView user= {user} movies = {movies} />
                  </Col>
                )}
              </>
            }
          />
            <Route
            path="/movies"
            element={
              <>
                <h1 id="intro" className="text-center">Reel Cinema Database</h1>
                <SearchBar 
                filterText={filterText}
                onFilterTextChange={handleFilterTextChange}
                />
                <h6 id="search-help" className="text-center">Search Entire Catalog</h6>
                <h5>Film Genre</h5>
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
                  <Nav.Link as={Link} to="/movies/Science Fiction">
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