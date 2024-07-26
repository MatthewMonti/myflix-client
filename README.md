# myFlix Client
Client application for myFlix - an app for movie enthusiasts. It is based on its movie API (server-side REST API and database). The client is built using React.

With this client and underlying API, this application is built with the MERN tech stack.
## Features
- User is able to sign up (username, password, email, date of birth) and log in with a username and password
- User is able to log out and also deregister
- App returns all movies existing in the database to the user
- App displays a detailed view about a single movie upon clicking on the movie card
- It is possible to filter movies with a search feature (search looks through movie title, description, director name, genre name, and genre description to find a match)
- User is able to see their profile with their account information and favourite movies
- User can add a movie to their favourites list as well as remove it from the list
- User can update their account information
## Running the Client
### Hosting
The client application is hosted on [Netlify](https://myflix-vdevhub.netlify.app/) and can be accessed through the provided link.
### Build Process with Parcel
If you'd like to run the application locally, pull this repository to your local host and initiate build process with Parcel using the following command:
```
parcel src/index.html
```
Then, open `localhost:1234` in your browser.
## Project Dependencies
### Production
- [React](https://react.dev/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [React DOM](https://legacy.reactjs.org/docs/react-dom.html)
- [React Router](https://reactrouter.com/en/main)
- [Bootstrap](https://getbootstrap.com/)
- [Prop-Types](https://www.npmjs.com/package/prop-types)
- [React Fontawesome](https://docs.fontawesome.com/web/use-with/react/) (+ free-regular-svg-icons, free-solid-svg-icons)
### Development
- [Parcel](https://parceljs.org/)
## API Used
The client utilizes the [movie-api](https://github.com/vdevhub/movie-api) built as a prerequisite for this particular client.