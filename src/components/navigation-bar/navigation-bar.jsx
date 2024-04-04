import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="black" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="navbar-toggler">
          Menu
        </Navbar.Toggle>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="api/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="api/user/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/api/user">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/api/movies">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/api/user/:id">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};