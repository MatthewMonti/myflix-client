import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

export const MovieView = ({ movies, user }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [token, setToken] = useState(null);
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem(`isToggled-${user.Favorite}`) === 'True'
  );
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
    if (user && user.Favorite) {
      setIsToggled(localStorage.getItem(`isToggled-${user.Favorite}`) ===  true);
    }
  }, [user]);


  const handleAddFavorite = () => {
    if (!user.Username) {
      alert("User information not available");
      return;
    }

    const data = {
      Username: user.Username,
      Favorite: movie.Title,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorites/add", {
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
    if (!user.Username) {
      alert("User information not available");
      return;
    }

    const data = {
      Username: user.Username,
      Favorite: movie.Title,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorites/delete", {
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
    <Row className="mx-5">
      <img className="movie-poster2" src={movie.Image} />
      <br></br>
      <div>
        <br></br>
        <Link to={`/movies`}>
          <Button className="d-flex align-items-center">View More Films</Button>
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
        <div>
          <ReactPlayer controls className="Video" url={movie.url} />
        </div>
      </div>
      <div>
        <br></br>
        <h2>{movie.Title}</h2>
      </div>
      <div>
        <h3 className="Label">Description: </h3>
        <p>{movie.Description}</p>
      </div>
      <div>
        <h3 className="Label">Release: </h3>
        <p>{movie.Release}</p>
      </div>
      <div>
        <h3 className="Label">Genre: </h3>
        <div>
          <h5 className="Label">Name:</h5>
          <p className="NO">{movie.Genre.Name}</p>
        </div>
        <div>
          <h5 className="Label">Description: </h5>
          <p className="NO">{movie.Genre.Description}</p>
        </div>
      </div>
      <div>
        <h3 className="Label">Rated: </h3>
        <p>{movie.Rated}</p>
      </div>
      <div>
        <h3 className="Label">Rating: </h3>
        <p>{movie.Rating}</p>
      </div>
      <div>
        <h3 className="Label">Actors: </h3>
        <p>{[movie.Actors.join(", ")]}</p>
      </div>
      <div>
        <h3 className="Label">Director: </h3>
        <div>
          <h5 className="Label">Name:</h5>
          <p className="NO">{movie.Director.Name}</p>
        </div>
        <div>
          <h5 className="Label">Bio: </h5>
          <p className="NO">{movie.Director.Bio}</p>
        </div>
        <div>
          <h5 className="Label">Birth: </h5>
          <p className="NO">{movie.Director.Birth}</p>
        </div>
        <div>
          <h5 className="Label">Death: </h5>
          <p className="NO">{movie.Director.Death}</p>
        </div>
      </div>
      <div>
        <h5 className="Label">Featured: </h5>
        <p>{movie.Featured}</p>
      </div>
    </Row>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};