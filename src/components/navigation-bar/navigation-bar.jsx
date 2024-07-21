import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="black" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/movies">
          Menu
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/movies">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut} to="https://reel-cinema.netlify.app">Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar