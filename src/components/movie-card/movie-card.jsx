import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './index.scss';

export const MovieCard = ({ movie, user }) => {
  const [token, setToken] = useState(null);
  const [toggleState, setToggleState] = useState(false);
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
    fetchToggleState();
  }, []);



  const handleToggle = () => {
    setIsToggled((prevState) => {
      const newState = !prevState; // Toggle the state
      localStorage.setItem(`isToggled-${movie._id}`, newState); // Update localStorage
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

  const fetchToggleState = () => {
    fetch('/toggleState')
      .then(response => response.json())
      .then(data => {
        setToggleState(data.state);
      })
      .catch((error) => {
        console.error("Error fetching toggle state:", error);
      });
  }

  const saveToggleState = (state) => {
    fetch('/saveToggleState', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save toggle state');
      }
    })
    .catch((error) => {
      console.error("Error saving toggle state:", error);
  });
}

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    setToggleState(isChecked);
    saveToggleState(isChecked);
  }

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
          onChange={handleToggleChange}
        >
          {isToggled ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

