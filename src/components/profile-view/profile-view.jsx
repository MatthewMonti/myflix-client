import React, { useState } from 'react';

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    birthday: '',
    email: '',
    favoriteMovies: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddFavoriteMovie = () => {
    const newMovie = prompt('Enter your favorite movie:');
    if (newMovie) {
      setUserInfo({
        ...userInfo,
        favoriteMovies: [...userInfo.favoriteMovies, newMovie]
      });
    }
  };

  const handleDeleteFavoriteMovie = (index) => {
    const updatedMovies = [...userInfo.favoriteMovies];
    updatedMovies.splice(index, 1);
    setUserInfo({ ...userInfo, favoriteMovies: updatedMovies });
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form>
        <label>Username:
          <input type="text" name="username" value={userInfo.username} onChange={handleInputChange} />
        </label><br />
        <label>Birthday:
          <input type="text" name="birthday" value={userInfo.birthday} onChange={handleInputChange} />
        </label><br />
        <label>Email:
          <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </label><br />
        <button type="button" onClick={handleAddFavoriteMovie}>Add Favorite Movie</button>
      </form>
      
      <h3>Favorite Movies:</h3>
      <ul>
        {userInfo.favoriteMovies.map((movie, index) => (
          <li key={index}>
            {movie} 
            <button onClick={() => handleDeleteFavoriteMovie(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};