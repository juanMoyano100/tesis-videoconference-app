import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import styles from './style.module.css'


const NavBar = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className={styles.navBar} >
      <Container>
        <Navbar.Brand style={{ color: "#fff" }} href="/">VideoConference App</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/" >Home</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
        {/* {!window.location.pathname.includes("/room") && */}
          <Button variant="outline-success" onClick={() => { handleLogout() }}>Cerrar sesión</Button>
        {/* } */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
