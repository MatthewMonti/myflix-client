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
  const [Favorites, setFavorite] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const token = localStorage.getItem('token');

  
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('https://movies-flex-6e317721b427.herokuapp.com/user/info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUserInfo(data);
      setUsername(data.Username || "");
      setEmail(data.Email || "");
      setBirthday(data.Birthday || "");
      setPassword(data.Password || "");
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const handleUsernameUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: Username
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/username", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, Username }));
        alert("Update Username successful");
      } else {
        alert("Update Username failed");
      }
    });
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();

    const data = {
      Password: Password
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/password", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Update Password successful");
      } else {
        alert("Update Password failed");
      }
    });
  };

  const handleEmailUpdate = (event) => {
    event.preventDefault();

    const data = {
      Email: Email
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/email", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, Email }));
        alert("Update email successful");
      } else {
        alert("Update email failed");
      }
    });
  };

  const handleBirthdayUpdate = (event) => {
    event.preventDefault();

    const data = {
      Birthday: Birthday
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/birthday", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, Birthday}));
        alert("Update birthday successful");
      } else {
        alert("Update birthday failed");
      }
    });
  };


  const handleAddFavorite = (event) => {
    event.preventDefault(event);
    const data = {
      Username: Username,
      Favorites: Favorites,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorites/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUserInfo((prevUserInfo) => ({ ...prevUserInfo, Favorites }));
          fetchUserInfo()
          alert("Favorite added successfully");
        } else {
          alert("Failed to add favorite");
        }
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
  };

  const handleDeleteFavorite = (event) => {
    event.preventDefault(event);
    const data = {
      Username: Username,
      Favorites: Favorites,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/favorites/delete", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUserInfo((prevUserInfo) => ({ ...prevUserInfo, Favorites }));
          fetchUserInfo()
          alert("Favorite deleted successfully");
        } else {
          alert("Failed to delete favorite");
        }
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
      });
  };
  

  const handleReset = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      Favorite: Favorites
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
        
        try {
          window.location.href = "/"; 
        } catch (error) {
          alert("Redirection failed. Please navigate to the home page manually.");
        }
        
      } else {
        alert("User account failed to delete");
      }
    });
  };

  return (
    <div>
      {userInfo && (
        <div>
          <h3>User Information</h3>
          <h5>Username: </h5> <p>{userInfo.Username}</p>
          <h5>Email: </h5> <p>{userInfo.Email}</p>
          <h5>Birthday: </h5> <p>{userInfo.Birthday}</p>
          <h5>Favorites: </h5><p> {Array.isArray(userInfo.Favorites) ? userInfo.Favorites.join(', ') : 'No favorites available'}</p>
        </div>
      )}
      <Form
        onSubmit={handleUsernameUpdate}
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
          />
        </Form.Group>
        <br />
        <Button  variant="primary" type="submit">
          Update Username
        </Button>
      </Form>
      <Form
        onSubmit={handlePasswordUpdate}
      >
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
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
        onSubmit={handleEmailUpdate}
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
        onSubmit={handleBirthdayUpdate}
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
      <Form>
        <Form.Group>
          <Form.Label>Favorite:</Form.Label>
          <Form.Control
            onChange={(e) => setFavorite(e.target.value)}
            required
          />
        </Form.Group>
        <Button  
        onClick={handleAddFavorite}
        variant="primary" 
        type="submit">
          Add Favorite
        </Button>
        <Button    
        onClick={handleDeleteFavorite}
        variant="primary" 
        type="submit">
          Delete Favorite
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