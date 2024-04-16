import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CSS from 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.scss'

export const ProfileView = ({ updateUser }) => {
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [Email, setEmail] = useState("")
  const [Birthday, setBirthday] = useState("")
  const [showBirthday, setShowBirthday] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        
        event.preventDefault();

  const data = {
    Username: Username,
    Password: Password,
    Email: Email,
    Birthday: Birthday
  };  

  fetch("https://movies-flex-6e317721b427.herokuapp.com/api/user/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        updateUser(data.user, data.token);
      } else {
        alert("User updated");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
    <Form 
    onSubmit={handleSubmit}>
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

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
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
         type={
          showBirthday ? "date" : "password"
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
      <Button variant="primary" type="submit">
        Update
      </Button>
      <br />
        <br />
    </Form>
  );
};
