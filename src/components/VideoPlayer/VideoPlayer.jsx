import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function VideoPlayer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video data from JSON URL
    fetch('https://example.com/videos.json')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      {videos.map(movie => (
        <div key={movie.url}>
          <YouTube videoId={movie.url} />
        </div>
      ))}
    </div>
  );
}

export default VideoPlayer;
