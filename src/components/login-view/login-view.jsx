import React from "react";

export const LoginView = () => {
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
const [username, setUsername] = useState("");

    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://movies-flex-6e317721b427.herokuapp.com/api/user/login", {
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  <input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};