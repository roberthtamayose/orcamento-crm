import { useEffect } from 'react';
import { Navbar, Offcanvas, Nav, NavDropdown, Container } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { selectFilial, getFilial} from '../../store/Filiais';


const Sidebar = () => {
  // const [filial, setFilial] = useState({id:'00', nome:'Filial'})
  const {dataFilial, select} = useSelector(state => state.filialReduce)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFilial())
  },[]);

  return(
    <div className="fixed top-0 left-0 right-0">
    {[false].map((expand) => (
      <Navbar key={expand} bg="light" expand={expand} className="mb-3 ">
        <Container fluid>
          <NavDropdown
            title={select.nomeFilial}
            id={`offcanvasNavbarDropdown-expand-${expand}`}
          >
            {dataFilial.map((item) => {return (<NavDropdown.Item key={item.id} onClick={() => dispatch(selectFilial(item))}> {item.nomeFilial} </NavDropdown.Item>)})}
          </NavDropdown>
          <Navbar.Brand >Nova Silk</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                  {/* <NavDropdown
                    title="Escolha Filial"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3"> Action </NavDropdown.Item>
                    <NavDropdown.Item href="#action4"> Another action </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/transportadoras">transportadora</Nav.Link>
                {/* <Nav.Link href="/Pedido">Pedidos</Nav.Link> */}
                <Nav.Link href="/condPagamentos">Condição de Pagamento</Nav.Link>
                <Nav.Link href="/orcamentos">Orçamento</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
    </div>
  )
}


export default Sidebar;