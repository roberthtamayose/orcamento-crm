///////////////// HOOKS //////////////
import React, { useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
import { selectCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import api from "../../services/api";
// import { postCarrinho } from '../../store/Carrinho';
import { postOrcamento } from '../../store/Orcamentos';
import { getDispProd } from '../../store/produtos';
import { postCarrinho, getCarrinho} from '../../store/Carrinho';
import { useParams } from 'react-router-dom';
///////////////// COMPONENTS //////////////
import { Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import ViewCarrinho from './carrinho/ViewCarrinho'
import AddCarrinho from './carrinho/AddCarrinho'
import SelectCliente from '../../components/Clientes/SelectCliente'

// 6461977603          
const IncluirOrcamento = () => {
    const dispatch = useDispatch()
    const {initialProd,initialCor, initialDisp} = useSelector(state => state.prodReduce)
    const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
    const {select} = useSelector(state => state.filialReduce)
    const {dataCarrinho} = useSelector(state => state.carrinhoReduce)
    const {dataUser} = useSelector(state => state.userReduce)
    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [prodModal, setProdModal] = useState([]);
    const [cor, setCor] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if(id){
            dispatch(selectCliente(id,''))
            console.log("tem ID")
        }
        dispatch(getDispProd(select.idFilial))
        // if(selectCli) {
        //     dispatch(getCarrinho(select.idFilial,selectCli.codCliente,selectCli.codVendedor))
        // }
        setProdModal(false)
    },[select]);

    
//////////////////Ajusta Filial //////////////
    const getCor = (codprod) => {
        const params = new URLSearchParams([['filial', "02"], ['codProduto', codprod]]);
        api
        .get(`/produtos/cores`, { params })
        .then((response) => {setCor(response.data)})
        .catch((err) => {   
        console.error("ops! ocorreu um erro" + err);
        });
    }

    const ItemCores = ({cores}) => {
        return(<>
            <tbody >
                <tr>
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{cores.codCor}</td> 
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{cores.nmCor}</td> 
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>
                        <a  className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd" }} onClick={() => { setProdModal(cores); setModalShow(!modalShow)}}>
                            {cores.qtd}
                        </a> 
                       
                    </td>
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >
                        <a  className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd"}}>
                            <b>Prg. Futura</b>
                        </a>    
                    </td>   
                </tr>
            </tbody>  
            </>
        )
    }




    return(
        
        <div className="flex flex-col items-center pt-16 h-screen">
            <h1>Incluir Orçamento</h1>
            <div className="flex flex-row items-center">
                {console.log("teste.....",dataUser[0])}
                <div className="mr-2" >
                    {id ? <h4>Cliente: {selectCli.nmCliente}</h4> : <SelectCliente codVendedor={dataUser[0].idErpUser}/>}
                </div>
                <button
                    aria-label="get Pedido"
                    onClick={() => setModalShow1(!modalShow1)}
                        // navigate("/pedido/editar")}
                    style={{margin: '10px'}}
                    className=""
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button> 
            </div>
            <><br/></>
            <Accordion flush className="w-full md:w-3/4">
                {initialProd.map((item, key) => {
                return(
                    <Accordion.Item key={item.filial+item.idErpProduto} eventKey={item.filial+item.idErpProduto}  onClick={() => getCor(item.idErpProduto)}>
                        <Accordion.Header ><p className="text-sm mr-2 my-0">{item.idErpProduto +' - '+ item.nmProduto}</p> </Accordion.Header>
                        <Accordion.Body style={{overflow:"auto"}} >
                            <table className="w-full">
                                <thead>
                                    <tr style={{textAlign:"center"}}>
                                        <th rowspam="true" style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Codigo cor</th> 
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Nome cor</th>
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>95</th>
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >Prg. Futura</th>
                                    </tr> 
                                </thead>
                                {cor.map((item1) => {
                                    return(
                                        <ItemCores cores={{...item1,...item}} key={item1.idErpProduto+item1.codCor}/>
                                    )
                                })}
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>
                )})}
            </Accordion>
            {selectCli && <AddCarrinho
                show={modalShow}
                onHide={() => setModalShow(!modalShow)}
                item={prodModal}
            />}
            {selectCli && <ViewCarrinho
                show={modalShow1}
                onHide={() => setModalShow1(!modalShow1)}
                carrinho={dataCarrinho}
            />}
        </div>
    )
}


export default IncluirOrcamento

// onClick={() => {setProdModal({...item1,nmProduto:item.nmProduto});setModalShow(!modalShow)}}
// onClick={() => {setProdModal({...cores,nomeProduto:estoque.nmProduto});setModalShow(!modalShow)}}


