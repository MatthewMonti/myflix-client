export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span className="Label">Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span className="Label">Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span className="Label">Release: </span>
        <span>{movie.Release}</span>
      </div>
      <div>
        <span className="Label">Genre: </span>
        <span>{movie.Genre.join(' ')}</span>
      </div>
      <div>
        <span className="Label">Rated: </span>
        <span>{movie.Rated}</span>
      </div>
      <div>
        <span className="Label">Rating: </span>
        <span>{movie.Rating}</span>
      </div>
      <div>
        <span className="Label">Actors: </span>
        <span>{[movie.Actors.join(', ')]}</span>
      </div>
      <div>
        <span className="Label">Director: </span>
        <span>{movie.Director.join(' ')}</span>
      </div>
      <div>
        <span className="Label">ImagePath: </span>
        <span>{movie.ImagePath}</span>
      </div>
      <div>
        <span className="Label">Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};