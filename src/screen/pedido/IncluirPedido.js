///////////////// HOOKS //////////////
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
// import { getCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import api from "../../services/api";
import { postCarrinho } from '../../store/Carrinho';
///////////////// COMPONENTS //////////////
import { Container, Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import SelectCliente from '../../components/Clientes/SelectCliente'
import EditarCarrinho from './EditarCarrinho'
///////////////// CSS //////////////
import '../../App.css';

const IncluirPedido = () => {
    // const {selectCli} = useSelector(state => state.clienteReduce)
    const {initialProd } = useSelector(state => state.dispReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const [refresh, setRefresh] = useState(true);

    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [prodModal, setProdModal] = useState([]);
    const [cor, setCor] = useState([]);

    



    // useEffect(() => {
    //     const params = new URLSearchParams([['limit', 10]]);
    //     api
    //     .get("/disponibilidades/produtos", { params })
    //     .then((response) => setProd(response.data))
    //     .catch((err) => {
    //       console.error("ops! ocorreu um erro" + err);
    //     });
    // }, []);
const AddProdCarrinho = (props) => {
        const [formProd, setFormProd] = useState({
                idItem : 0,
                codProduto : props.item.codProduto,
                nmProduto : props.item.nmProduto,
                idErpColecao : props.item.idErpColecao,
                vlUnitario : 0,
                vlDesconto : 0,
                vlTotal : 0,
                qtdItem : 0,  
                idPedido : 0
        });

        const onChangeForm = (e) =>{
            setFormProd({...formProd, [e.target.name]: e.target.value})
        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>{props.item.codProduto}</h4>
                        <h6>{'Coleção: '+ props.item.idErpColecao +'  |  Quantidade: '+props.item.qtdEstoque}</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Quantidade</Form.Label>
                                    <Form.Control name="qtdItem" onChange={onChangeForm} type="int" placeholder="0.0" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Desconto</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control name="vlDesconto" onChange={onChangeForm} aria-label="Valor em reais" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Preço</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control name="vlUnitario" onChange={onChangeForm} aria-label="Valor em reais" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Total</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control name="vlTotal" onChange={onChangeForm} aria-label="Valor em reais" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => dispatch(postCarrinho(formProd,props.onHide()))}>Adicionar no carrinho</Button>
                    <Button onClick={() => props.onHide()}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    const ViewCarrinho = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Carrinho</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <EditarCarrinho/>
                </Modal.Body>
                <Modal.Footer>
                    <Button >Salvar</Button>
                    <Button onClick={() => props.onHide()}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
//////////////////Ajusta Filial //////////////
    const getCor = (codProduto) => {
        const params = new URLSearchParams([['idFilial', 1],['codProduto',codProduto.substring(0, 9)]]);
        api
        .get("/disponibilidades/estoques", { params })
        .then((response) => {setCor(response.data)})
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }
    
    return(
        <Container className='Container'>
            <h1>Incluir Pedido</h1>
            <SelectCliente/>
            <button
                aria-label="get Pedido"
                onClick={() => setModalShow1(!modalShow1)}
                    // navigate("/pedido/editar")}
                style={{margin: '10px'}}
                >
                Carrinho
            </button> 
            <><br/></>
            <Accordion flush>
                {initialProd.map((item, key) => {
                return(
                    <Accordion.Item key={key} eventKey={key} style={{marginBottom:"10px"}} onClick={() => getCor(item.codProduto)}>
                        <Accordion.Header className='RowItem'>{item.codProduto.substr(0,9) +' - '+ item.nmProduto }</Accordion.Header>
                        <Accordion.Body style={{overflow:"auto"}} >
                            <table>
                                <thead>
                                    <tr style={{textAlign:"center"}}>
                                        <th rowspam="true" style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Cod. Cor</th> 
                                        {/* <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>Nome Cor</th>     */} 
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>95</th>       
                                        <th style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >Prg. Futura</th>   
                                    </tr> 
                                </thead>
                                {cor.map((item1, index) => {
                                    return(
                                    <tbody key={index}>
                                        <tr>
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{item1.codProduto.substr(10,item1.codProduto.length)}</td> 
                                            {/* <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>item1.</td>     */}
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >
                                                {item1.qtdEstoque > 0 ? 
                                                    <a  className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd"}} onClick={() => {setProdModal({...item1,nmProduto:item.nmProduto});setModalShow(!modalShow)}}>
                                                        {item1.qtdEstoque}
                                                    </a> 
                                                :
                                                    <p style={{textDecoration: "none",  marginBottom: "3px" }}>{item1.qtdEstoque}</p>
                                                }
                                            </td>       
                                            <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >
                                                <a  className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd"}} onClick={() => {setProdModal({...item1,nmProduto:item.nmProduto});setModalShow(!modalShow)}}>
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
            <AddProdCarrinho
                show={modalShow}
                onHide={() => setModalShow(!modalShow)}
                item={prodModal}
            />
            <ViewCarrinho
                show={modalShow1}
                onHide={() => setModalShow1(!modalShow1)}
            />
        </Container>
    )
}


export default IncluirPedido

