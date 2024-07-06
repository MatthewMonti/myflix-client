import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user }) => {
  const [token, setToken] = useState(null);
  const [toggleState, setToggleState] = useState(false);

  const [isToggled, setIsToggled] = useState(
    localStorage.getItem(`isToggled-${user.Favorite}`) === 'True'
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
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
          <Button>Details</Button>
        </Link>
        <Button
          onClick={handleAddFavorite}
          type="checkbox"
          id="toggle"
        >
          Add To Favorites
        </Button>
        <Button
          onClick={handleDeleteFavorite}
          type="checkbox"
        >
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
