///////////////// HOOKS //////////////
import React, { useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
import { selectCliente } from '../../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
// import { postCarrinho } from '../../store/Carrinho';
import { getCondpag } from '../../../store/CondPagamento';
import { getTransp } from '../../../store/Transportadora';
import { postPedido } from '../../../store/Pedidos';
import { getCarrinho } from '../../../store/Carrinho';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
///////////////// COMPONENTS //////////////
import { Button, Form, Row, Col, Alert, Modal } from 'react-bootstrap';

// 6461977603          
const FinalizaPedido = () => {
    const dispatch = useDispatch()
    const { selectCli } = useSelector(state => state.clienteReduce)
    const { dataTransp } = useSelector(state => state.transpReduce)
    const { dataCondPag } = useSelector(state => state.condPagReduce)
    const {select} = useSelector(state => state.filialReduce)
    const { id } = useParams();

    const [transportadora,setTransportadora] = useState("")
    const [condPagamento,setCondPagamento] = useState("")
    const [observacao,setObservacao] = useState("")
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    let param  = useLocation();

    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCondpag())
        dispatch(getTransp())
        dispatch(selectCliente(id))
        dispatch(getCarrinho(select.idFilial, selectCli.codCliente, selectCli.codVendedor))
        // console.log("ItemProdCarrinho", select.idFilial,selectCli.codCliente,selectCli.codVendedor)

    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newDate = new Date();
        const ano = newDate.getFullYear()
        const mes = newDate.getMonth()+1
        const dia = newDate.getDate()
        const date = `${ano}${("0"+mes).slice(-2)}${("0"+dia).slice(-2)}`
        // const date = `${ano}${mes}${dia}`

        const arrayTransformado = param.state.map(obj => ({
            filial: obj.filial,
            codProduto: obj.codProduto,
            nmProduto: obj.nmProduto,
            um: obj.um,
            codColecao: obj.codColecao,
            quantidade: obj.quantidade,
            preco: obj.preco,
            total: obj.preco * obj.quantidade
        }));

        const form = {
            "filial": select.idFilial,
            "codPedido": "",
            "tipo": "1",
            "codCliente": selectCli.codCliente,
            "codLoja": selectCli.codLoja,
            "codTransportadora": transportadora,
            "tipoCliente": "R",
            "condPagamento": condPagamento,
            "tabela": "95",
            "vendedor": selectCli.codVendedor,
            "comissao": "3",
            "emissao": date,
            "tipoFrete": "F",
            "observacao": observacao,
            "ativo": "1",
            "item": arrayTransformado
        }
        dispatch(postPedido(form, setShow(true)))
        

    };

    return(
        <div className="min-w-screen min-h-screen mt-10 flex justify-center font-sans overflow-hidden">
            <div className="w-full lg:w-4/6">
                <div className=" rounded my-6">
                    <div className=" flex flex-col items-center">
                        <h1>Finalizar pedido</h1>
                        <div className=" w-full">
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Cliente</Form.Label>
                                        <Form.Control type="text"
                                                    value={selectCli.nmCliente}
                                                    readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState1">
                                        <Form.Label>Cond. de Pagamento</Form.Label>
                                        <Form.Select defaultValue="Escolha..." onChange={e => setCondPagamento(e.target.value)}>
                                            <option>Escolha...</option>
                                            {dataCondPag.map((item, key) => {
                                                return(
                                                    <option key={key} value={item.idErpCondPag}>{item.idErpCondPag} - {item.nmCondPag}</option>
                                                )
                                            })
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState2">
                                        <Form.Label>Transportadora</Form.Label>
                                        <Form.Select defaultValue="Escolha..." onChange={e => setTransportadora(e.target.value)}>
                                        <option>Escolha...</option>
                                            {dataTransp.map((item, key) => {
                                                return(
                                                    <option key={key} value={item.idErpTransp}>{item.idErpTransp} - {item.nmTransp}</option>
                                                )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control as="textarea"
                                                style={{ height: '100px' }}
                                                placeholder="..." 
                                                onChange={e => setObservacao(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Finalizar
                                </Button>
                            </Form>
                            <div
                                className="modal show"
                                style={{ display: 'block', position: 'initial' }}
                                >
                               <Modal show={show} onHide={() => setShow(false)}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Cadastrado com sucesso</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={() => {setShow(false); navigate('/orcamentos')}}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalizaPedido

