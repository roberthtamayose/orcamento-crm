///////////////// HOOKS //////////////
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
import { getCliente } from '../../store/Clientes';
import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import api from "../../services/api";

///////////////// COMPONENTS //////////////
import { Container, Accordion} from 'react-bootstrap';
import SelectCliente from '../../components/Clientes/SelectCliente'
///////////////// CSS //////////////
import '../../App.css';

const IncluirPedido = () => {
    const {selectCli} = useSelector(state => state.clienteReduce)
    const {initialProd , initialEst} = useSelector(state => state.dispReduce)
    const dispatch = useDispatch()
    // const navigate = useNavigate();
    const [refresh, setRefresh] = useState(true);


    const [prod, setProd] = useState([]);
    const [cor, setCor] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams([['limit', 10]]);
        api
        .get("/disponibilidades/produtos", { params })
        .then((response) => setProd(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);
    
//////////////////Ajusta Filial //////////////
    const getCor = (codProduto) => {
        const params = new URLSearchParams([['idFilial', 1],['codProduto',codProduto.substring(0, 9)]]);
        api
        .get("/disponibilidades/estoques", { params })
        .then((response) => setCor(response.data))
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }
    
    return(
        <Container className='Container'>
             <button
                aria-label="get Pedido"
                onClick={() => setRefresh(!refresh)}
                style={{margin: '10px'}}
                >
                Refresh
            </button> 
            <h1>Incluir Pedido</h1>
            <SelectCliente/>
            <><br/></>
            <Accordion flush>
                {initialProd.map((item, key) => {
                return(
                    <Accordion.Item key={key} eventKey={key} style={{marginBottom:"10px"}} onClick={() => getCor('item.codProduto')}>
                        <Accordion.Header className='RowItem'>{item.codProduto.substr(0,9) +' - '+ item.nmProduto }</Accordion.Header>
                        <Accordion.Body style={{overflow:"auto"}} >
                            <table>
                                <thead>
                                    <tr style={{textAlign:"center"}}>
                                        <th rowspam="true" style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Cod. Cor</th> 
                                        {/* <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Nome Cor</th>     */} 
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>95</th>       
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Prg. Futura</th>   
                                    </tr> 
                                </thead>
                                {cor.map((item1, index) => {
                                    return(
                                    <tbody key={index}>
                                        <tr>
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{item1.codProduto.substr(10,item1.codProduto.length)}</td> 
                                            {/* <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>item1.</td>     */}
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{item1.qtdEstoque}</td>       
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>
                                                <a className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd"}}>
                                                    <b>Prg. Futura</b>
                                                </a>    
                                            </td>   
                                        </tr>
                                    </tbody>   
                                )})}
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>
                )})}
            </Accordion>
        </Container>
    )
}


export default IncluirPedido

