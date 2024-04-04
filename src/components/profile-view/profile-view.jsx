import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"



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
      <Form>
        <Form.Label>Username:
          <Form.Control type="text" name="username" value={userInfo.username} onChange={handleInputChange} />
        </Form.Label><br />
        <Form.Label>Birthday:
          <Form.Control type="text" name="birthday" value={userInfo.birthday} onChange={handleInputChange} />
        </Form.Label><br />
        <Form.Label>Email:
          <Form.Control type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </Form.Label><br />
        <Button className="fav">Update</Button>
      </Form>
      
      <h3>Favorite Movies:</h3>
      <Form>
      <Form.Label>Favorite Film:
        <Form.Control type="text" name="text" value={userInfo.email} onChange={handleInputChange} />
          <Button className="fav">Add:</Button> 
        <Button className="fav">Delete</Button>
      </Form.Label>
      </Form>
    </div>
  );
};