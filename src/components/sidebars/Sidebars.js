import { useEffect } from 'react';
import { Navbar, Offcanvas, Nav, NavDropdown, Container } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { selectFilial, getFilial} from '../../store/Filiais';

import logo from '../../images/logo_Nova-Silk.png';

const Sidebar = () => {
  // const [filial, setFilial] = useState({id:'00', nome:'Filial'})
  const {dataFilial, select} = useSelector(state => state.filialReduce)
  const {dataUser} = useSelector(state => state.userReduce)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFilial())
  },[dispatch]);

  return(
    <div className="absolute top-0 left-0 right-0 bg-orange-500 w-full">
    {[false].map((expand) => (
      <Navbar key={expand} expand={expand} className="bg-orange-500">
        <Container fluid className="bg-orange-500">
          <NavDropdown
            title={select.nmFilial}
            id={`offcanvasNavbarDropdown-expand-${expand}`}
          >
            {dataFilial.map((item) => {return (<NavDropdown.Item key={item.idFilial} onClick={() => dispatch(selectFilial(item))}> {item.nmFilial} </NavDropdown.Item>)})}
          </NavDropdown>
          <Navbar.Brand ><img src={logo} width="100" height="24"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Usuário: {dataUser[0].nmUsuario +' '+ dataUser[0].sobrenomeUsuario}
              </Offcanvas.Title>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} onClick={() => console.log("teste")}>
                Sair
              </Offcanvas.Title>
              
            </Offcanvas.Header>
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menus
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
                {/* <Nav.Link href="/transportadoras">transportadora</Nav.Link> */}
                {/* <Nav.Link href="/Pedido">Pedidos</Nav.Link> */}
                {/* <Nav.Link href="/condPagamentos">Condição de Pagamento</Nav.Link> */}
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