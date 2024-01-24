import { Navbar, Container, Nav, Button } from "react-bootstrap";
import styles from './style.module.css'
import { signOut } from "next-auth/react"


const NavBar = () => {
  return (
    <Navbar expand="lg" className={styles.navBar} >
      <Container>
        <Navbar.Brand style={{ color: "#fff" }} href="/">VideoConference App</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/" >Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Button variant="outline-success" onClick={() => { signOut() }}>Cerrar sesión</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
