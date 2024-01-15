///////////////// HOOKS //////////////
import React, { useEffect, useState } from "react";
import { Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
// import { getCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import { postCarrinho } from '../../../store/Carrinho';
import { getCarrinho, putCarrinho, deleteCarrinho} from '../../../store/Carrinho';
import api from "../../../services/api";
///////////////// COMPONENTS //////////////
// import { Container, Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';

const AddCarrinho = (props) => {
    const dispatch = useDispatch()
    const { select } = useSelector(state => state.filialReduce)
    const { selectCli } = useSelector(state => state.clienteReduce)

    const [precoProd, setPrecoProd] = useState([]);
    const [formProd, setFormProd] = useState({
        filial: select.idFilial,
        codCliente: selectCli.codCliente,
        codVendedor: selectCli.codVendedor,
        codProduto: props.item.idErpProduto+"C"+props.item.codCor,
        nmProduto: props.item.nmProduto+"./"+props.item.nmCor,
        um: props.item.um,
        codColecao: "95",
        quantidade: 0,
        preco: precoProd[0] ? precoProd[0].prodPreco : 0,
        ativo: '1'

     
    });

    useEffect(() => {
        getPreco()
        setFormProd({...formProd, filial: select.idFilial, codVendedor: selectCli.codVendedor, codCliente: selectCli.codCliente, codProduto: props.item.idErpProduto+"C"+props.item.codCor, nmProduto: props.item.nmProduto+"./"+props.item.nmCor, um: props.item.um, codColecao: "95"})
    },[props.item, selectCli]);

    const getPreco = () => {
        const params = new URLSearchParams([['codProduto', props.item.idErpProduto+'C'+props.item.codCor]]);
        api
        .get(`/precos/ProdPreco/`, { params })
        .then((response) => {setPrecoProd(response.data)})
        .catch((err) => {   
        console.error("ops! ocorreu um erro" + err);
        });
    }

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
                <Form name={props.prod_id} >
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
                                    <InputGroup.Text>R$</InputGroup.Text>
                                    <Form.Control name="preco" onChange={onChangeForm} defaultValue={formProd.preco} type="int" aria-label="Valor em reais" />
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
                <Button onClick={() => {dispatch(postCarrinho(formProd));props.onHide()}}>Adicionar no carrinho</Button>
                {/* <Button onClick={() => {setCarrinho([...carrinho, Object.assign(formProd, props.item)]);props.onHide()}}>Adicionar no carrinho</Button> */}
                <Button onClick={() => props.onHide()}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );

}
export default AddCarrinho