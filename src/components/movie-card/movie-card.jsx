// Here you import the PropTypes library
import PropTypes from "prop-types";

import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";


// The MovieCard function component
export const MovieCard = ({ movie }) => {

  return (
    <Card>
       <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img className="movie-poster" variant="link" src={movie.Image} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text> 
        <Button>Favorite: {}</Button>
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