// UserInfoComponent.js

import React, { useState, useEffect } from 'react';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

export const UserInfoComponent = () => {
  const navigate = useNavigate()
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState("")
  const [Birthday, setBirthday] = useState("");
  const [showBirthday, setShowBirthday] = useState("")
  const [Favorite] = useState("");
  const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserInfo(storedUser);
        setUsername(storedUser.Username || ""); //
        setPassword(storedUser.Password || "");
        setEmail(storedUser.Email ||"");
        setBirthday(storedUser.Birthday || "")
      }
    }, []);;
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/update", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        window.location.reload(false);
        alert("Update user successful");
      } else {
        alert("Update user failed");
      }
    });
  };
  

  const handleReset = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      Favorite: Favorite
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/delete", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("User account successfully deleted");
        setUser(null); 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = "/"; 
      } else {
        alert("User account failed to delete");
      }
    });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        const response = await fetch('https://movies-flex-6e317721b427.herokuapp.com/user/info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userInfo && (
        <div>
          <h3>User Information</h3>
          <h5>Username: </h5> <p>{userInfo.Username}</p>
          <h5>Email: </h5> <p>{userInfo.Email}</p>
          <h5>Birthday: </h5> <p>{userInfo.Birthday}</p>
          <h5>Favorites: </h5> <p> {userInfo.Favorites && userInfo.Favorites.join(', ')}</p>
        </div>
      )}
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="input-bg"
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5" 
            placeholder="Stevenson"
          />
        </Form.Group>
        <br />
        <Button  variant="primary" type="submit">
          Update Username
        </Button>
      </Form>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
           type={
            showPassword ? "text" : "password"
           }
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button  variant="primary" type="submit">
          Update Password
        </Button>
      </Form>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button  variant="primary" type="submit">
          Update Email
        </Button>
      </Form>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            value={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button  variant="primary" type="submit">
          Update Birthday
        </Button>
      </Form>

      <Form 
      onReset={handleReset}
      encType="multipart/form-data">
        <br />
        <Button
          className="mt-2"
          variant="primary" type="reset">
            Erase Account
        </Button>
      </Form>
    </div>
  );
};
export default UserInfoComponent;