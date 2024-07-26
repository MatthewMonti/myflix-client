import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CSS from 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        
        event.preventDefault();

  const data = {
    Username: Username,
    Password: Password
  };  

  fetch("https://movies-flex-6e317721b427.herokuapp.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
    <Form onSubmit={handleSubmit}
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
          minLength="3" 
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
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
      <Button variant="primary" type="submit">
        Login
      </Button>  
      <br /> 
      <Link to={`/signup`}>
          <Button>Signup</Button>
        </Link>
        <br />
    </Form>
  );
};

export default LoginView