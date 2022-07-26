import React, { useEffect, useState } from "react";
import { Container, Accordion } from 'react-bootstrap';
import '../../App.css';
import api from "../../services/api";

const Pedido = () => {
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
    
    const getCor = (prod) => {
        const params = new URLSearchParams([['prod',prod.substring(0, 9)]]);
        api
        .get("/disponibilidades/cores", { params })
        .then((response) => setCor(response.data))
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }
    
    if (!prod) return "No produto!"
    return(
        <Container className='Container'>
            <Accordion flush>
                {prod.map((item, key) => {
                return(
                    <Accordion.Item key={key} eventKey={key} style={{marginBottom:"10px"}} onClick={() => getCor(item.codProduto)}>
                        <Accordion.Header className='RowItem'>{item.codProduto +' - '+ item.nmProduto +' - qtd: '+ item.qtdEstoque}</Accordion.Header>
                        <Accordion.Body style={{overflow:"auto"}} >
                            <table>
                                <thead>
                                    <tr style={{textAlign:"center"}}>
                                        <th rowspam="true" style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Cod. Cor</th> 
                                        {/* <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Nome Cor</th>     */}
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>37</th>    
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>38</th>       
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>39</th>       
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>40</th>    
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>89</th>      
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>94</th>       
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>95</th>       
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Prg. Futura</th>   
                                    </tr> 
                                </thead>
                                {cor.map((item1, index) => {
                                    return(
                                    <tbody key={index}>
                                        <tr>
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{item1.codProduto.substring(10,item1.codProduto.length)}</td> 
                                            {/* <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>item1.</td>     */}
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>0</td>    
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>0</td>       
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>0</td>       
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>40</td>    
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>0</td>      
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>0</td>       
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>0</td>       
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


export default Pedido

