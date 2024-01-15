///////////////// HOOKS //////////////
import React, { useEffect, useState } from "react";
import { Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
// import { getCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import { getCarrinho, putCarrinho, deleteCarrinho} from '../../../store/Carrinho';
import { useNavigate } from "react-router-dom";
///////////////// COMPONENTS //////////////
// import { Container, Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
// import SelectCliente from '../../components/Clientes/SelectCliente'


const ViewCarrinho = (props) => {
    const {selectCli} = useSelector(state => state.clienteReduce)
    // const {dataCarrinho } = useSelector(state => state.carrinhoReduce)
    const dataCarrinho = props.carrinho
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(true);
    const {select} = useSelector(state => state.filialReduce)
    const [errorForm, setErrorForm] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        console.log("ItemProdCarrinho",  select.idFilial,selectCli.codCliente,selectCli.codVendedor)
        dispatch(getCarrinho(select.idFilial,selectCli.codCliente,selectCli.codVendedor))
    },[refresh, selectCli, props.show]);

    const ItensCarrinho = () => {

        const ItemProdCarrinho = (props) => {
            const [edit, setEdit] = useState(false);
            const [itemProd, setItemProd] = useState(props.item);
        
            const btnPutCarrinho = () =>{
                dispatch(putCarrinho(itemProd, setEdit(!edit)))
                setRefresh(!refresh)
            }

            const deleteItemProd = () =>{
                dispatch(deleteCarrinho(itemProd.idPedido, itemProd.idItem, setEdit(!edit)))
                setRefresh(!refresh)
            }
            
            return(
                <tr key={props.index} className={props.index%2 === 1 ? "table-active" : null}>
                    <td>{itemProd.codProduto}</td>
                    <td>{itemProd.codColecao}</td>
                    {edit ?
                        <>
                            <td><input style={{width: "50px", background: "#ededed"}} value={itemProd.quantidade} onChange={(e) => setItemProd({...itemProd, quantidade: parseInt(e.target.value)})}/></td>
                            <td><input style={{width: "50px", background: "#ededed"}} value={itemProd.preco} onChange={(e) => setItemProd({...itemProd, preco: parseInt(e.target.value)})}/></td>
                            <td>{itemProd.quantidade * itemProd.preco}</td>
                        </>
                        :
                        <>
                            <td>{itemProd.quantidade}</td>
                            <td>{itemProd.preco}</td>
                            {/* <td>{itemProd.vlDesconto}</td> */}
                            <td>{itemProd.quantidade * itemProd.preco}</td>
                        </>
                    }
                    <td>
                        {edit?
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <a  onClick={() => btnPutCarrinho()} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>S</a>
                                <a  onClick={() => {setEdit(!edit);setRefresh(!refresh)}} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>N</a>
                            </div>
                            :
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <a  onClick={() => setEdit(!edit)} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>Editar</a>
                                <a  onClick={() => deleteItemProd()} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>X</a>
                            </div>
                        }
                    </td>
                </tr>
            )
        }
        // console.log("ItemProdCarrinho",  props)
        console.log("dataCarrinho",dataCarrinho)

        return(
            <div className="table-responsive" >
                <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Coleção</th>
                            <th scope="col">Qtd</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Total</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.carrinho.map((item, index)=> {
                            return(
                                <ItemProdCarrinho item={item} key={index} index={index}/>
                            )
                        })}
                        </tbody>
                </table>
            </div>
        
        )
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
                <ItensCarrinho carrinho={props.carrinho}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => navigate(`/orcamentos/incluir/${selectCli.codSharp}/finaliza`, {state: props.carrinho})}>Salvar</Button>
                <Button onClick={() => props.onHide()}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewCarrinho
