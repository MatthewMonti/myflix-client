import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function VideoPlayer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video data from JSON file
    fetch('videos.json')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      {videos.map(video => (
        <div key={video.url}>
          <YouTube videoId={video.url} />
        </div>
      ))}
    </div>
  );
}

export default VideoPlayer;