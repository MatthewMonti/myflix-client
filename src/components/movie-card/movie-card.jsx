import PropTypes from "prop-types";
import React from "react";
import { Card, Button } from "react-bootstrap"; // Consolidate imports
import { Link } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";


export const MovieCard = ({ movie, user, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const [Favorite, setFavorite] = useState("");
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: user.Username, 
      Favorite: movie.Title
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorite", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Favorite added successful");
        window.location.reload();
      } else {
        alert("Favorite Failed");
      }
    });
  }; // Merge props into one object



  const handleDelete = (event) => {
    event.preventDefault();

    const data = {
      Username: user.Username, 
      Favorite: movie.Title
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorite", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Favorite was deleted");
        window.location.reload();
      } else {
        alert("Favorite Failed");
      }
    });
  }; // Merge props into one object

  return (
    <Card>
      <Card.Img className="movie-poster" src={movie.Image} />
      <Card.Body>
        <Card.Title className="text-center">{movie.Title}</Card.Title>
        <Card.Text className="text-center">{movie.Director.Name}</Card.Text> 
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button>Details</Button>
        </Link>
        <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          Favorite Add
        </Button>
        </Form>
        <Form onSubmit={handleDelete}>
          <Button variant="primary" type="submit">
            Favorite Delete
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Release: PropTypes.string.isRequired,
    Actors: PropTypes.array.isRequired,
    Rated: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    Image: PropTypes.string.isRequired,
    Featured: PropTypes.string.isRequired,
  })
};
