import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

function LeftNavbar() {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
    const [typeNavbar, setTypeNavBar] = useState();

    useEffect(()=>{
        setTypeNavBar(isSmallScreen?false:'sm');
    },[isSmallScreen]);

  return (
    <>

      <Navbar key={typeNavbar} expand={typeNavbar} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/" className="px-3">Kösen</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${typeNavbar}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${typeNavbar}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${typeNavbar}`}
            placement="start"
            style={{ width: '250px' }}
          >
            <Offcanvas.Header >
            <Image
              src="/icon.png"  // Update with the path to your icon file
              alt="Icon"
              className="d-inline-block align-top"
              width="30"
              height="30"
            />
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${typeNavbar}`}>
                Emrah Kösen
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-4 ">
                <Nav.Link href="about">About Me</Nav.Link>
                <Nav.Link href="resume">Resume</Nav.Link>
                 <NavDropdown
                  title="Games"
                  id={`offcanvasNavbarDropdown-expand-${typeNavbar}`}
                  style={{ width: '200px' }}
                >
                  <NavDropdown.Item href="games/2048">2048</NavDropdown.Item>
                  <NavDropdown.Item href="games/candy">
                    Candy Crush
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Another Game
                  </NavDropdown.Item>
                </NavDropdown> 
              </Nav>

              
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

  </>
  );
}

export default LeftNavbar;