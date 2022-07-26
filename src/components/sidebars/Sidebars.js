import { Navbar, Offcanvas, Nav, NavDropdown, Container } from 'react-bootstrap';


const Sidebar = () => {
  return(
    <>
    {[false].map((expand) => (
      <Navbar key={expand} bg="light" expand={expand} className="mb-3">
        <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Brand href="#">Nova Silk</Navbar.Brand>
          <NavDropdown
            title="Empresa"
            id={`offcanvasNavbarDropdown-expand-${expand}`}
          >
            <NavDropdown.Item href="#action3"> Action </NavDropdown.Item>
            <NavDropdown.Item href="#action4"> Another action </NavDropdown.Item>
          </NavDropdown>
          {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> */}
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Usuario Teste
                  </Offcanvas.Title>
                  <NavDropdown
                    title="Escolha Filial"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3"> Action </NavDropdown.Item>
                    <NavDropdown.Item href="#action4"> Another action </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/transportadora">transportadoras</Nav.Link>
                <Nav.Link href="/Pedidos">Pedidos</Nav.Link>
                <Nav.Link href="/CondPagamento">Condição de Pagamento</Nav.Link>

                {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
    </>
  )
}


export default Sidebar;