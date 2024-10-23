// SignupView.js

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [showBirthday, setShowBirthday] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert("Signup successful");
          handleLogin(); // Attempt to log in after signup
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Signup failed");
      });
  };

  const handleLogin = () => {
    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          if (typeof onLoggedIn === "function") {
            onLoggedIn(data.user, data.token);
            navigate("/movies");
          } else {
            console.error("onLoggedIn is not a function or is undefined");
          }
        } else {
          alert("Login failed: Invalid user or token");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        alert("Something went wrong during login: " + e.message);
      });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.Username || "");
      setPassword(storedUser.Password || "");
      setEmail(storedUser.Email || "");
      setBirthday(storedUser.Birthday || "");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          className="input-bg"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="custom-checkbox-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <span className="custom-checkmark"></span>
          Show Password
        </label>
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type={showEmail ? "text" : "password"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="custom-checkbox-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={showEmail}
            onChange={() => setShowEmail((prev) => !prev)}
          />
          <span className="custom-checkmark"></span>
          Show Email
        </label>
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type={showBirthday ? "date" : "password"}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <label className="custom-checkbox-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={showBirthday}
            onChange={() => setShowBirthday((prev) => !prev)}
          />
          <span className="custom-checkmark"></span>
          Show Email
        </label>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
  );
};

export default SignupView;