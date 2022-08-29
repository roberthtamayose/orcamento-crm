import './App.css';
import Pedido from './screen/pedido/Pedido';
import IncluirPedido from './screen/pedido/IncluirPedido';
import EditarCarrinho from './screen/pedido/EditarCarrinho';
import Sidebar from './components/sidebars/Sidebars'
import CondPagamento from './screen/condPagamento/CondPagamento'
import IncluirCondPagamento from './screen/condPagamento/IncluirCondPagamento'
import EditarCondPagamento from './screen/condPagamento/EditarCondPagamento'
import Transportadora from './screen/transportadora/Transportadora'
import IncluirTransportadora from './screen/transportadora/IncluirTransportadora'
import EditarTransportadora from './screen/transportadora/EditarTransportadora'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTransp } from './store/Transportadora';
import { getCondpag } from './store/CondPagamento';
import { getFilial } from './store/Filiais';
import { getPedido } from './store/Pedidos';
import { getCliente } from './store/Clientes';
import { getDispProd } from './store/Disponibilidade';





import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTransp())
    dispatch(getFilial())
    dispatch(getCondpag()) 
    dispatch(getPedido())    
    dispatch(getCliente())    
    dispatch(getDispProd())    
  });

  return (
      <Container fluid>
        <Sidebar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pedido/>}/>
            <Route path="/Pedido" element={<Pedido/>}/>
            <Route path="/Pedido/incluir" element={<IncluirPedido/>}/>
            <Route path="/Pedido/editar" element={<EditarCarrinho/>}/>
            <Route path="/transportadora" element={<Transportadora/>}/>
            <Route path="/transportadora/incluir" element={<IncluirTransportadora/>}/>
            <Route path="/transportadora/editar" element={<EditarTransportadora/>}/>
            <Route path="/condPagamento" element={<CondPagamento/>}/>
            <Route path="/condPagamento/incluir" element={<IncluirCondPagamento/>}/>
            <Route path="/condPagamento/editar" element={<EditarCondPagamento/>}/>
          </Routes>
        </BrowserRouter>
      </Container>
    
  )
}

export default App;
