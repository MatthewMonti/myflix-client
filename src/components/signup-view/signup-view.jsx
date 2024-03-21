import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CSS from 'bootstrap/dist/css/bootstrap.min.css';

export const SignupView = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");
  
    const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = {
          Username: Username,
          Password: Password,
          Email: Email,
          Birthday: Birthday
        };
    
        fetch("https://movies-flex-6e317721b427.herokuapp.com/api/user", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Signup successful");
            window.location.reload();
          } else {
            alert("Signup failed");
          }
        });
      };
  
    return (
      <Form onSubmit={handleSubmit}>
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
            className="input-bg"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
      </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            className="input-bg"
            type="date"
            value={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
        Sign-up
      </Button>
      </Form>
    );
  };