import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import '../../index.scss';
import SearchBar from "../search-bar/search-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserInfoComponent } from "../profile-view/profile-view";
import FilterCard from "../filter-card/filter-card";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (!token) return;

    fetch("https://movies-flex-6e317721b427.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          _id: doc._id,
          Title: doc.Title,
          Release: doc.Release,
          Actors: doc.Actors.join(', '),
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
        }));
        setMovies(moviesFromApi);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);

  const handleFilterTextChange = (text) => {
    setFilterText(text);
  };

  const filteredMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes(filterText.toLowerCase()) ||
    movie.Director.Name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Navbar bg="black" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user ? (
                <>
                  <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                  <Nav.Link onClick={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                  }}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/profile" element={<ProfileView user={user} />} />
        <Route path="/movies" element={<MoviesView movies={filteredMovies} filterText={filterText} user={user} onFilterTextChange={handleFilterTextChange} />} />
        <Route path="/movies/:movieId" element={<MovieDetailView movies={movies} />} />
      </Routes>
    </BrowserRouter>
  );
};

const Home = ({ user }) => (
  <Col md={5}>
    <h3 id="intro">Welcome to Reel Cinema Database</h3>
    <img className="icon" src="https://cdn.dribbble.com/users/1913706/screenshots/4353135/reel-alwin.gif" alt="gif file old projector is running"/>
    <h4>Login</h4>
    {user ? (
      <Navigate to="/movies" />
    ) : (
      <LoginView />
    )}
  </Col>
);

const Signup = () => (
  <Col>
    <h4>Create Account</h4>
    <SignupView />
  </Col>
);

const ProfileView = ({ user }) => (
  <>
    <h4>User Profile</h4>
    <UserInfoComponent user={user} />
  </>
);

const MoviesView = ({ movies, filterText, user, onFilterTextChange }) => {
  return (
    <>
      <h1 className="text-center">Reel Cinema Database</h1>
      <SearchBar className="text-center" filterText={filterText} onFilterTextChange={onFilterTextChange} />
      <Row>
        {movies.map(movie => (
          <Col key={movie._id} className="mx-auto">
            <MovieCard user={user} movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

const MovieDetailView = ({ movies }) => {
  // Example of how to fetch and display detailed movie information
  // Based on the selected movieId param from the URL
  return (
    <Col>
      <h1 className="text-center">Movie Details</h1>
      {/* Implement your MovieView component to display detailed movie information */}
      <MovieView movies={movies} />
    </Col>
  );
};

export default MainView;

