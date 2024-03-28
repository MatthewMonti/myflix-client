import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import {VideoPlayer} from "../VideoPlayer/VideoPlayer.jsx"
import ReactPlayer from 'react-player/youtube'
import { useParams } from "react-router";
import { Link } from "react-router-dom";



export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
  
    const movie = movies.find((movie) => movie._id === movieId);

    if (!movie) {
      return <div>Movie not found</div>;
  }

  return (
    <div>
      <div>
        <img className="movie-poster2"src={movie.Image} />
      </div> 
      <div>
        <span className="Label">Trailer: </span>
        <ReactPlayer className="Video" url={movie.url} /> 
      </div>  
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
        <div className="Label">Genre: </div>
          <div>
          <span className="Label">Name:</span>
          <span className="NO">{movie.Genre.Name}</span>
          </div>
          <div>
          <span className="Label">Description: </span>
          <span className="NO">{movie.Genre.Description}</span>
          </div>
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
        <div className="Label">Director: </div>
          <div>
          <span className="Label">Name:</span>
          <span className="NO">{movie.Director.Name}</span>
          </div>
          <div>
            <span className="Label">Bio: </span>
            <span className="NO">{movie.Director.Bio}</span>
          </div>
          <div>
            <span className="Label">Birth: </span>
            <span className="NO">{movie.Director.Birth}</span>
          </div>
          <div>
            <span className="Label">Death: </span>
            <span className="NO">{movie.Director.Death}</span>
          </div>
      </div>    
      <div>
        <span className="Label">Featured: </span>
        <span>{movie.Featured}</span>
      </div>
    </div>
  );
};