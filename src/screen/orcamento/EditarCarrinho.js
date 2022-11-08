///////////////// HOOKS //////////////
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
///////////////// STORE //////////////
// import { getCliente } from '../../store/Clientes';
// import { getDispProd, getDispEst } from '../../store/Disponibilidade';
import { getCarrinho, putCarrinho, deleteCarrinho} from '../../store/Carrinho';
///////////////// COMPONENTS //////////////
// import { Container, Accordion, Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
// import SelectCliente from '../../components/Clientes/SelectCliente'
///////////////// CSS //////////////
import '../../App.css';


const EditarCarrinho = (props) => {
    // const {selectCli} = useSelector(state => state.clienteReduce)
    // const {dataCarrinho } = useSelector(state => state.carrinhoReduce)
    const dataCarrinho = props.carrinho
    const dispatch = useDispatch()
    // const navigate = useNavigate();
    const [refresh, setRefresh] = useState(true);


    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(getCarrinho())
    //         // console.log("Mount item");
    //         // return () => console.log("Unmount item");
    //       }, 1000);  
    // },[refresh]);

    const ItemProdCarrinho = (props) => {
        const [edit, setEdit] = useState(false);
        const [itemProd, setItemProd] = useState(props.item);
    
        const putItemProd = () =>{
            dispatch(putCarrinho(itemProd, setEdit(!edit)))
            setRefresh(!refresh)

        }

        const deleteItemProd = () =>{
            dispatch(deleteCarrinho(itemProd.idPedido, itemProd.idItem, setEdit(!edit)))
            setRefresh(!refresh)
        }
        
        return(
            <tr key={props.index} className={props.index%2 === 1 ? "table-active" : null}>
                <td>{itemProd.codProd}</td>
                <td>{itemProd.nomeProd}</td>
                <td>{itemProd.estoque[0].colecao}</td>
                {edit ?
                    <>
                        <td><input style={{width: "50px"}} value={itemProd.quantidade} onChange={(e) => setItemProd({...itemProd, quantidade: parseInt(e.target.value)})}/></td>
                        <td><input style={{width: "50px"}} value={itemProd.preco} onChange={(e) => setItemProd({...itemProd, preco: parseInt(e.target.value)})}/></td>
                        {/* <td><input style={{width: "50px"}} value={itemProd.vlDesconto} onChange={(e) => setItemProd({...itemProd, vlDesconto: parseInt(e.target.value)})}/></td> */}
                        {/* <td><input style={{width: "50px"}} value={itemProd.quantidade * itemProd.preco} onChange={(e) => setItemProd({...itemProd, vlTotal: parseInt(e.target.value)})}/></td> */}
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
                            <a  onClick={() => putItemProd()} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>S</a>
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

    return(
        <div className="table-responsive" >
            <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Coleção</th>
                        <th scope="col">Qtd</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Total</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataCarrinho.map((item, index)=> {
                        return(
                            <ItemProdCarrinho item={item} key={index} index={index}/>
                        )
                    })}
                    </tbody>
            </table>
        </div>
      
    )
}

export default EditarCarrinho
