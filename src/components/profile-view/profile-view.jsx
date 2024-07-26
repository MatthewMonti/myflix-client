// UserInfoComponent.js

import React, { useState, useEffect } from 'react';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UserInfoComponent = () => {
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState("")
  const [Birthday, setBirthday] = useState("");
  const [showBirthday, setShowBirthday] = useState("")
  const [userInfo, setUserInfo] = useState(null);
  const [Username, setUsername] = useState("");
  const [Favorite, setFavorite] = useState("");
  const [showFavorite, setShowFavorite] = useState("")
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserInfo(storedUser);
        setUsername(storedUser.Username || ""); //
        setPassword(storedUser.Password || "");
        setEmail(storedUser.Email ||"");
        setBirthday(storedUser.Birthday || "")
        setFavorite(storedUser.Favorite || "")
      }
    }, []);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);


  const handleAddFavorite = () => {
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
          setIsToggled(true);
        } else {
          alert("Failed to add favorite");
        }
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
  };

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
          setIsToggled(false);
        } else {
          alert("Failed to delete favorite");
        }
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
      });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/update", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Update user successful");
        window.location.reload();
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

    fetch("https://movies-flex-6e317721b427.herokuapp.com/delete", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("User account successfully deleted");
        window.location.reload();
      } else {
        alert("User account failed to delete");
      }
    });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        const response = await fetch('https://movies-flex-6e317721b427.herokuapp.com/user', {
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
          <h5>Favorites: </h5> <p> {userInfo.Favorite && userInfo.Favorite.join(', ')}</p>
        </div>
      )}
      <Form 
      onSubmit={handleSubmit}
      onReset={handleReset}
      addFavorite={handleAddFavorite}
      deleteFavorite={handleAddFavorite}
      encType="multipart/form-data"
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
  
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
          placeholder="EmpireStar#384"
           type={
            showPassword ? "text" : "password"
           }
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Show Password</label>
            <input
                type="checkbox"
                value={showPassword}
                onChange={() =>
                    setShowPassword((prev) => !prev)
                }
            />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            placeholder="stevenson@gmail.com"
           type={
            showEmail ? "text" : "password"
           }
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Show Email</label>
            <input
                type="checkbox"
                value={showEmail}
                onChange={() =>
                    setShowEmail((prev) => !prev)
                }
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            placeholder="####-##-##"
           type={
            showBirthday ? "text" : "date"
           }
            value={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          <label>Show Birthday</label>
            <input
                type="checkbox"
                value={showBirthday}
                onChange={() =>
                    setShowBirthday((prev) => !prev)
                }
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Favorite:</Form.Label>
          <Form.Control
            className="input-bg"
            type="text"
            value={Favorite}
            onChange={(e) => setFavorite(e.target.value)}
            required
            minLength="5" 
            placeholder="Stevenson"
          />
        </Form.Group>
        <br />
        <Button  variant="primary" type="submit">
          Update Account
        </Button>
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