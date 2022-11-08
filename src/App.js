import './App.css';
// import { useSelector } from 'react-redux';
// import Pedido from './screen/pedido/Pedido';
// import IncluirPedido from './screen/pedido/IncluirPedido';
// import EditarCarrinho from './screen/pedido/EditarCarrinho';
import Sidebar from './components/sidebars/Sidebars'
import CondPagamento from './screen/condPagamento/CondPagamento'
import IncluirCondPagamento from './screen/condPagamento/IncluirCondPagamento'
import EditarCondPagamento from './screen/condPagamento/EditarCondPagamento'
import Transportadora from './screen/transportadora/Transportadora'
import IncluirTransportadora from './screen/transportadora/IncluirTransportadora'
import EditarTransportadora from './screen/transportadora/EditarTransportadora'
import IncluirOrcamento from './screen/orcamento/IncluirOrcamento'
import Orcamento from './screen/orcamento/Orcamento'
import Login from './screen/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTransp } from './store/Transportadora';
import { getCondpag } from './store/CondPagamento';
import { getFilial } from './store/Filiais';
import { getCliente } from './store/Clientes';
import { getDispProd } from './store/produtos';

// import { getUser } from './store/Usuarios';

// import Navbar from './sidebar'



import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const dispatch = useDispatch()
  // const {dataUser} = useSelector(state => state.userReduce)

  useEffect(() => {
    dispatch(getTransp())
    dispatch(getFilial())
    dispatch(getCondpag()) 
    // dispatch(getPedido())    
    dispatch(getCliente())    
    dispatch(getDispProd())    
  },[]);
// },[dataUser]);


  // if (dataUser[0] && getUser(dataUser[0])){
      return (
          <Container fluid>
            <Sidebar/>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<IncluirOrcamento/>}/>
                {/* <Route path="/Pedido" element={<Pedido/>}/>
                <Route path="/Pedido/incluir" element={<IncluirPedido/>}/>
                <Route path="/Pedido/editar" element={<EditarCarrinho/>}/> */}
                <Route path="/transportadoras" element={<Transportadora/>}/>
                <Route path="/transportadoras/incluir" element={<IncluirTransportadora/>}/>
                <Route path="/transportadoras/editar" element={<EditarTransportadora/>}/>
                <Route path="/condPagamentos" element={<CondPagamento/>}/>
                <Route path="/condPagamentos/incluir" element={<IncluirCondPagamento/>}/>
                <Route path="/condPagamentos/editar" element={<EditarCondPagamento/>}/>
                <Route path="/orcamentos/incluir" element={<IncluirOrcamento/>}/>
                <Route path="/orcamentos" element={<Orcamento/>}/>
              </Routes>
            </BrowserRouter>
          </Container>
      )
  // }
  // else{
  //   return (
  //     <Container fluid>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<Login/>}/>
  //         </Routes>
  //       </BrowserRouter>
  //     </Container>
  //   )
  // }
  
}

export default App;
