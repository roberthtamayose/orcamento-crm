///////////////// HOOKS //////////////
import React, { useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
// import { getCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import api from "../../services/api";
// import { postCarrinho } from '../../store/Carrinho';
import { postOrcamento } from '../../store/Orcamentos';
import { getDispProd } from '../../store/produtos';
///////////////// COMPONENTS //////////////
import { Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import SelectCliente from '../../components/Clientes/SelectCliente'
import EditarCarrinho from './EditarCarrinho'
///////////////// CSS //////////////
import '../../App.css';

const IncluirOrcamento = () => {
    const {selectCli} = useSelector(state => state.clienteReduce)
    const {initialProd } = useSelector(state => state.prodReduce)
    const {select} = useSelector(state => state.filialReduce)

    const dispatch = useDispatch()
    // const navigate = useNavigate();
    // const [refresh, setRefresh] = useState(true);

    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [prodModal, setProdModal] = useState([]);
    const [cor, setCor] = useState([]);
    const [carrinho, setCarrinho] = useState([]);

      
    useEffect(() => {
       dispatch(getDispProd())  
    },[]);


const AddProdCarrinho = (props) => {
        const [formProd, setFormProd] = useState({
                filial : select,
                quantidade : 0,
                preco : 0,
                // orc_id : 1,
                prod_id : props.item.id,
                ativo : "S"
                

        });
        // console.log(props.item)
        // console.log("carrinho..." ,carrinho)
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
                        <h4>{props.item.codProd}</h4>
                        {/* <h6>{props.item.estoque[0] ? ('Coleção: '+ props.item.estoque[0].colecao +'  |  Quantidade: '+ props.item.estoque[0].colecao.quantidade) : null }</h6> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Quantidade</Form.Label>
                                    <Form.Control name="quantidade" onChange={onChangeForm} type="int" placeholder="0.0" />
                                </Form.Group>
                            </Col>
                            {/* <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Desconto</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control name="vlDesconto" onChange={onChangeForm} aria-label="Valor em reais" />
                                    </InputGroup>
                                </Form.Group>
                            </Col> */}
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Preço</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control name="preco" onChange={onChangeForm} aria-label="Valor em reais" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Total</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>$ {formProd.quantidade * formProd.preco}</InputGroup.Text>
                                        {/* <Form.Control name="total" onChange={onChangeForm} aria-label="Valor em reais" /> */}
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setCarrinho([...carrinho, Object.assign(formProd, props.item)]) }>Adicionar no carrinho</Button>
                    <Button onClick={() => props.onHide()}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    const ViewCarrinho = (props) => {
        const [errorForm, setErrorForm] = useState("");
        let carrinhoPost = []
        carrinho.forEach((element) => {
            carrinhoPost.push({filial: element.filial, 
                quantidade: element.quantidade, 
                preco: element.preco, 
                orc_id: 0, 
                prod_id: element.prod_id, 
                ativo: element.ativo
            })
        });
        const salvarOrcamento = () => {
            const formPost = {
                "filial": select.codFilial,
                "numOrc": "",
                "numRevisao": "",
                "status": "A",
                "cliente_id": selectCli,
                "vend_id": 1,
                "condPag_id": 1,
                "transp_id": 1,
                "ativo": "S",
                "itemOrcamento": carrinhoPost
            }

            if(!formPost.cliente_id || formPost.cliente_id === '0'){
                return setErrorForm("Informar cliente.")
            }
            if(!formPost.filial){
                return setErrorForm("Informar filial.")
            }
                dispatch(postOrcamento(formPost,() => setModalShow1(!modalShow1)))
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
                        <h4>Carrinho</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorForm ? <p className="text-red-600">{errorForm}</p>:null}
                   <EditarCarrinho carrinho={props.carrinho}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => salvarOrcamento()}>Salvar</Button>
                    <Button onClick={() => props.onHide()}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
//////////////////Ajusta Filial //////////////
    const getCor = (codprod) => {
        const params = new URLSearchParams([['filial', "02"]]);
        api
        .get(`/produtos/${codprod}`, { params })
        .then((response) => {setCor(response.data)})
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }
    

    const ItemCores = ({cores}) => {
        return(
            <tbody >
                <tr>
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{cores.cores.codCor}</td> 
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}}>{cores.cores.nomeCor}</td> 
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >
                        {cores.estoque[0] ? 
                            <a  className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd" }} onClick={() => {setProdModal(cores);setModalShow(!modalShow)}}>
                                {cores.estoque[0].quantidade}
                            </a> 
                        :
                            <p style={{textDecoration: "none",  marginBottom: "3px" }}>0</p>
                        }
                    </td>
                    <td style={{border: "1px solid #dee2e6", textAlign:"center", padding: "0.75rem"}} >
                        <a  className="btnItem" style={{textDecoration: "none", cursor: "pointer", marginTop: "3px", marginBottom: "3px", backgroundColor: "#f8f9fa", borderColor: "#ddd"}}>
                            <b>Prg. Futura</b>
                        </a>    
                    </td>   
                </tr>
            </tbody>  
        )
    }




    return(
        <div className="flex flex-col items-center pt-16 h-screen">
            <h1>Incluir Orçamento</h1>
            <div className="flex flex-row items-center">
                <SelectCliente/>
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
                    <Accordion.Item key={key} eventKey={key}  onClick={() => getCor(item.codProd)}>
                        <Accordion.Header ><p className="text-sm mr-2 my-0">{item.codProd +' - '+ item.nomeProd}</p> </Accordion.Header>
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
                                {cor.map((item1, key) => {
                                    return(
                                        <ItemCores cores={item1} key={key}/>
                                    )
                                })}
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
                carrinho={carrinho}
            />
        </div>
    )
}


export default IncluirOrcamento

// onClick={() => {setProdModal({...item1,nmProduto:item.nmProduto});setModalShow(!modalShow)}}
// onClick={() => {setProdModal({...cores,nomeProduto:estoque.nmProduto});setModalShow(!modalShow)}}
