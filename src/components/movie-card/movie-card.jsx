// Here you import the PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,isRequired
    }),
  }).isRequired,
    rated: Proptypes.string.isRequired,
    rating:Proptypes.string.isRequired,
    actors: [Propthypes.string.isRequired],
    director: PropTypes.shape({
      name: Proptype.string.isRequired,
      bio: Proptype.string.isRequired,
      birth: Proptypes.string.isRequired,
      Death: Proptype.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};