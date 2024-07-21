import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
export const SignupView = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Signup failed");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          value={password}
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
          type={showEmail ? "text" : "email"}
          placeholder="Enter your email"
          value={email}
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
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
    
    
 <Button variant="primary" type="submit" href="https://reel-cinema.netlify.app/">
    Create Account
  </Button>
    </Form>
  );
};

export default SignupView;
