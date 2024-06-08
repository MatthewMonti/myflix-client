import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user }) => {
  const [token, setToken] = useState(null);
  const [toggleState, setToggleState] = useState(false);

  const [isToggled, setIsToggled] = useState(
    localStorage.getItem(`isToggled-${user.Favorite}`) === 'false'
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
  }, []);

  const handleToggle = () => {
    setIsToggled((prevState) => {
      const newState = !prevState; // Toggle the state
      localStorage.setItem(`isToggled-${user.Favorite}`, newState); // Update localStorage
      return newState; // Return the new state
    });
  };

  const handleFavoriteAction = () => {
    if (isToggled) {
      handleDeleteFavorite();
    } else {
      handleAddFavorite();
    }
  };

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
          variant={isToggled ? "danger" : "success"}
          onClick={handleFavoriteAction}
          type="checkbox"
          id="toggle"
          checked={toggleState}
        >
          {isToggled ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
