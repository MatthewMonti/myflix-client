import React from "react";
import React, { useEffect, useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        
        event.preventDefault();

        const data = {
          access: Username,
          secret: Password
        };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/api/user/login", {
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(Username);
      } else {
        alert("Login failed");
      }
    });
  };     

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};