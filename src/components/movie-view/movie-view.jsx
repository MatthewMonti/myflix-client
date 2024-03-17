import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
       <ul>
      <button 
      onClick={onBackClick}
      className="back-button"
      style={{cursor: "pointer"}}
      >
      Back
      </button>
      </ul>
      <ul>
        <img className="movie-poster"src={movie.Image} />
      </ul>      
      <ul>
        <span className="Label">Title: </span>
        <span>{movie.Title}</span>
      </ul>
      <ul>
        <span className="Label">Description: </span>
        <span>{movie.Description}</span>
      </ul>
      <ul>
        <span className="Label">Release: </span>
        <span>{movie.Release}</span>
      </ul>
      <ul>
        <div className="Label">Genre: </div>
          <ul>
          <span className="Label">Name:</span>
          <span className="NO">{movie.Genre.Name}</span>
          </ul>
          <ul>
          <span className="Label">Description: </span>
          <span className="NO">{movie.Genre.Description}</span>
          </ul>
     </ul>
      <ul>
        <span className="Label">Rated: </span>
        <span>{movie.Rated}</span>
      </ul>
      <ul>
        <span className="Label">Rating: </span>
        <span>{movie.Rating}</span>
      </ul>
      <ul>
       <span className="Label">Actors: </span>
      <span>{[movie.Actors.join(', ')]}</span>
      </ul>
      
      
      
      
      <ul>
        <div className="Label">Director: </div>
          <ul>
          <span className="Label">Name:</span>
          <span className="NO">{movie.Director.Name}</span>
          </ul>
          <ul>
            <span className="Label">Bio: </span>
            <span className="NO">{movie.Director.Bio}</span>
          </ul>
          <ul>
            <span className="Label">Birth: </span>
            <span className="NO">{movie.Director.Birth}</span>
          </ul>
          <ul>
            <span className="Label">Death: </span>
            <span className="NO">{movie.Director.Death}</span>
          </ul>
      </ul>    
      <ul>
        <span className="Label">Featured: </span>
        <span>{movie.Featured}</span>
      </ul>
    </div>
  );
};