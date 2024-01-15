import React, { useState,useEffect } from "react";
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getPedido } from '../../store/Pedidos';
import { useParams, useNavigate, useLocation } from 'react-router-dom';


const Pedido = () => {
    const {dataPedido} = useSelector(state => state.pedidoReduce)
    // const dispatch = useDispatch()
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(true);
    // const { id } = useParams();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPedido())
    },[refresh]);
    
    return(
        <Container className='Container'>
            {/* {console.log()dataPedido} */}
            <h1>Pedido</h1>
            <button
                aria-label="get Pedido"
                onClick={() => setRefresh(!refresh)}
                style={{margin: '10px'}}
                >
                Refresh
            </button> 
            <button
                aria-label="get Pedido"
                onClick={() => navigate("/Pedido/incluir")}
                style={{margin: '10px'}}
                >
                Incluir
            </button>
            <div className="table-responsive ">
                <table className="table table-bordered" >
                        <thead>
                            <tr>
                            <th scope="col">Pedido</th>
                            <th scope="col">Emissão</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Obs</th>
                            <th scope="col">Status</th>
                            <th scope="col">Ativo</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataPedido.map((item, key)=> {
                            return(
                                <tr key={key} className={key%2 === 1 ? "table-active":null}>
                                    <td>{item.codPedido}</td>
                                    <td>{item.dtEmissao}</td>
                                    <td>{item.vlTotal}</td>
                                    <td>{item.obsPedido}</td>
                                    <td>{item.status}</td>
                                    <td>{item.ativo}</td>
                                    <td>
                                        <a href="/#" onClick={() => navigate("/Pedido/editar", {state: item})} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>Editar</a>
                                        {/* <a onClick={() => dispatch(deleteTransp(item, navigate("/Pedido")))} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true">Deletar</a> */}
                                    </td>
                                </tr>
                            )
                        })} 
                        </tbody>
                </table>
            </div>

        </Container>
    )
}


export default Pedido

