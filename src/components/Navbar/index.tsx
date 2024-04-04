import { Navbar, Container, Nav, Button } from "react-bootstrap";
import styles from './style.module.css'
import { signOut } from "next-auth/react"
import Image from "next/image";



const NavBar = () => {
  return (
    <Navbar expand="lg" className={styles.navBar} >
      <Container>
          <Image
            src="/banner.png"
            width={150}      
            height={50}      
            className="d-inline-block align-top"
            alt="Logo"
          />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/home" >Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Button variant="outline-success" onClick={() => { signOut() }}>Cerrar sesión</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
