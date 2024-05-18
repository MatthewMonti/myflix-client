import { useState } from 'react';
import { Button } from 'react-bootstrap';

const ToggleFavoriteButton = ({ movie, user }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [favorite, setFavorite] = useState([]);

  // Function to handle toggle button click
  const handleToggle = () => {
    setIsToggled(prevState => !prevState); // Toggle the state
    // Add or remove movie from favorites list based on the toggle state
    if (!isToggled) {
      setFavorite([...favorite, movie.Title]); // Add movie to favorites list
    } else {
      setFavorite(favorite.filter(fav => fav !== movie.Title)); // Remove movie from favorites list
    }
  };

  // Function to submit new favorite movie
  const handleSubmitFavorite = () => {
    // Implement logic to submit new favorite movie
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
              // Update UI state here instead of reloading the page
            } else {
              alert("Failed to add favorite");
            }
          })
          .catch((error) => {
            console.error("Error adding favorite:", error);
          });
          console.log(`Submit favorite movie: ${movie.Title}`);
      };

  // Function to delete existing favorite movie
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
              // Update UI state here instead of reloading the page
            } else {
              alert("Failed to delete favorite");
            }
          })
          .catch((error) => {
            console.error("Error deleting favorite:", error);
          });
    // Implement logic to delete existing favorite movie
    console.log(`Delete favorite movie: ${movie.Title}`);
  };

  // Determine which function to use based on the toggle state
  const handleFavoriteAction = isToggled ? handleDeleteFavorite : handleSubmitFavorite;

  return (
    <Button variant={isToggled ? 'danger' : 'success'} onClick={handleToggle}>
      {isToggled ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  );
};

export default ToggleFavoriteButton;


