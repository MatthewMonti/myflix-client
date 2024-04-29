// Here you import the PropTypes library
import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";


// The MovieCard function component
export const MovieCard = ({ movie}, {user}) => {


  return (
    <Card>
        <Card.Img className="movie-poster" src={movie.Image} />
      <Card.Body>
        <Card.Title className="text-center">{movie.Title}</Card.Title>
        <Card.Text className="text-center">{movie.Director.Name}</Card.Text> 
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Button>Details</Button>
      </Link>
      <Card.Title className="text-center">Favorite:</Card.Title>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard

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
    Featured: PropTypes.string.isRequired
  })
};