import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";



export const FilterCard = ({ movie, user }) => {
  const [token, setToken] = useState(null);
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem(`isToggled-${movie._id}`) === 'true'
  );
  // Retrieve token from local storage
const retrievedToken = localStorage.getItem(`isToggled-${movie._id}`);

// Store token in session storage
sessionStorage.setItem(`isToggled-${movie._id}`, token);

// Retrieve token from session storage
const retrievedSessionToken = sessionStorage.getItem('movieToken');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken ? storedToken : null);
  }, []);

  const handleAddFavorite = () => {
    const data = {
      Username: user.Username,
      Favorite: movie.Title,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorites", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Favorite added successfully");
          setIsToggled(true);
          localStorage.setItem(`isToggled-${movie._id}`, true);
        } else {
          alert("Failed to add favorite");
        }
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
  };

  const handleDeleteFavorite = () => {
    const data = {
      Username: user.Username,
      Favorite: movie.Title,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorites", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Favorite deleted successfully");
          setIsToggled(false);
          localStorage.setItem(`isToggled-${movie._id}`, false);
        } else {
          alert("Failed to delete favorite");
        }
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
      });
  };

  return (
    <Card>
      <Card.Img className="movie-poster" src={movie.Image} />
      <Card.Body>
        <Card.Title className="text-center">{movie.Title}</Card.Title>
        <Card.Text className="text-center">{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button
           className="d-flex align-items-center"
          >Details</Button>
        </Link>
        <br />
        <Button
          onClick={handleAddFavorite}
          type="checkbox"
          id="toggle"
          className="d-flex align-items-center"
        >
          Add To Favorites
        </Button>
        <br />
        <Button
          onClick={handleDeleteFavorite}
          type="checkbox"
          className="d-flex align-items-center"
        >
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FilterCard
