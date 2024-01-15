///////////////// HOOKS //////////////
import React, { useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
// import { getCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import api from "../../services/api";
// import { postCarrinho } from '../../store/Carrinho';
import { postOrcamento} from '../../store/Orcamentos';
import { useNavigate , useLocation} from "react-router-dom";
import { getCarrinho, putCarrinho, deleteCarrinho} from '../../store/Carrinho';
import Field from '../../components/Field'

///////////////// COMPONENTS //////////////
import { Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import SelectCliente from '../../components/Clientes/SelectCliente'
import { selectCliente, getCliente} from '../../store/Clientes';
import { selectFilial, getFilial} from '../../store/Filiais';

import ViewCarrinho from './carrinho/ViewCarrinho'

const EditarOrcamento = (navigation) => {
    const [refresh, setRefresh] = useState(true);
    const {dataFilial, select} = useSelector(state => state.filialReduce);
    const { dataCliente, selectCli } = useSelector(state => state.clienteReduce);

    const {state} = useLocation();
    const dispatch = useDispatch()

    const [formOrc, setFormOrc] = useState(state);
  
    useEffect(() => {
        dispatch(getCliente())
        dispatch(getFilial())
    },[]);

    const onChangeForm = (e) => {
        setFormOrc({...formOrc, [e.target.name]: e.target.value})
    }
    // console.log(state)
    const ItemProdCarrinho = (props) => {
        const [edit, setEdit] = useState(false);
        const [itemProd, setItemProd] = useState(props.item);
        
        const putItemProd = () => {
            dispatch(putCarrinho(itemProd, setEdit(!edit)))
            setRefresh(!refresh)

        }

        const deleteItemProd = () => {
            dispatch(deleteCarrinho(itemProd.idPedido, itemProd.idItem, setEdit(!edit)))
            setRefresh(!refresh)
        }
        
        return(
            <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center whitespace-nowrap">
                    <span className="font-medium">{itemProd.produto.codProd}</span>
                </td>
                <td className="py-3 px-6 text-center">
                    <span>{itemProd.produto.nomeProd}</span>
                </td>
                <td className="py-3 px-6 text-center">
                    <span>{itemProd.produto.colecao}</span>
                </td>
                {edit ?
                    <>
                        <td className="py-3 px-6 text-center">
                            <input style={{width: "50px"}} value={itemProd.quantidade} onChange={(e) => setItemProd({...itemProd, quantidade: parseInt(e.target.value)})}/>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <input style={{width: "50px"}} value={itemProd.preco} onChange={(e) => setItemProd({...itemProd, preco: parseInt(e.target.value)})}/>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span>{itemProd.quantidade * itemProd.preco}</span>
                        </td>
                        <td className="flex py-3 px-6 items-center justify-evenly">
                            <div onClick={() => putItemProd()} className="w-4 transform hover:text-purple-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div onClick={() => {setEdit(!edit);setRefresh(!refresh)}} className="w-4 transform hover:text-purple-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                        </td>
                    </>
                    :
                    <>
                        <td className="py-3 px-6 text-center">
                            <span>{itemProd.quantidade}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span>{itemProd.preco}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span>{itemProd.quantidade * itemProd.preco}</span>
                        </td>
                        <td className="flex py-3 px-6 items-center justify-evenly">
                            <div onClick={() => setEdit(!edit)} className="w-4  transform hover:text-purple-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <div onClick={() => deleteItemProd()} className="w-4  transform hover:text-purple-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </td>
                    </>
                }
                
            </tr>
        )
    }

    return(
        <div className="flex flex-col items-center pt-16 h-screen w-full">
            <h1>Editar orçamento</h1>
            <div className="flex flex-col items-center">
                    {/* <div className="flex flex-col"> */}
                <Form >
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Filial</Form.Label>
                                <Form.Select name="filial" value={state.filial} onChange={(e) => dispatch(selectFilial(e.target.value))}>
                                    <option value={0}>Selecione uma Filial</option>
                                    {dataFilial.map((item, key ) => { 
                                        return (
                                        <option className="text-sm" key={key} value={item.codFilial}>{item.nomeFilial}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Cliente</Form.Label>
                                <Form.Select name="cliente" value={state.cliente.id} onChange={(e) => dispatch(selectCliente(e.target.value))}>
                                    <option value={0}>Selecione um cliente</option>
                                    {dataCliente.map((item, key ) => { 
                                        return (
                                        <option className="text-sm" key={key} value={item.id}>{item.nomeCliente}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Orçamento</Form.Label>
                                <Form.Control name="quantidade" onChange={onChangeForm} type="int" defaultValue={state.numOrc} disabled readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Revisão</Form.Label>
                                <Form.Control name="quantidade" onChange={onChangeForm} type="int" defaultValue={state.numRevisao} disabled readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="status"  value={formOrc.status} onChange={onChangeForm}>
                                    <option value={0}>Selecione uma Filial</option>
                                    <option className="text-sm" value="A">A - Aberto</option>
                                    <option className="text-sm" value="B">B - Efetivado</option>
                                    <option className="text-sm" value="C">C - Cancelado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Ativo</Form.Label>
                                <Form.Control name="quantidade" onChange={onChangeForm} type="int" defaultValue={state.ativo} disabled readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Transportadora</Form.Label>
                                <Form.Control name="quantidade" onChange={onChangeForm} type="int" defaultValue={state.transportadora.nomeTransp} disabled readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Condição de Pagamento</Form.Label>
                                <Form.Control name="quantidade" onChange={onChangeForm} type="int" defaultValue={state.condPagamento.nomeCondPag} disabled readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
            <><br/></>
            <h1>Produtos</h1>        
            <div className=" w-full lg:w-4/6 mt-10 flex font-sans overflow-x-auto">
                <table className=" min-w-max w-full table-auto ">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Codigo</th>
                            <th className="py-3 px-6 text-center">Produto</th>
                            <th className="py-3 px-6 text-left">Coleção</th>
                            <th className="py-3 px-6 text-center">Qtd</th>
                            <th className="py-3 px-6 text-center">Valor</th>
                            <th className="py-3 px-6 text-center">Total</th>
                            <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {state.item.map((item, index) => {
                            return(
                                <ItemProdCarrinho key={item.id} item={item} index={index}/>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default EditarOrcamento