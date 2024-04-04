// Here you import the PropTypes library
import PropTypes from "prop-types";

import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";


// The MovieCard function component
export const UserCard = ({ user }) => {

  return (
    <Card>
       <Link to={`/api/users/${encodeURIComponent(user._id)}`}>
      </Link>
      <Card.Body>
        <Card.Title>{user.Username}</Card.Title>
        <Card.Text>{user.Password}</Card.Text>
        <Card.Text>{user.Birthday}</Card.Text>
        <Card.Text>{user.Email}</Card.Text>
        <Card.Text>{user.Favorite}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Favorites: [PropTypes.array]
  })
};