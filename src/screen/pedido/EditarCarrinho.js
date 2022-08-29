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


const EditarCarrinho = () => {
    // const {selectCli} = useSelector(state => state.clienteReduce)
    const {dataCarrinho } = useSelector(state => state.carrinhoReduce)
    const dispatch = useDispatch()
    // const navigate = useNavigate();
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            dispatch(getCarrinho())
            // console.log("Mount item");
            // return () => console.log("Unmount item");
          }, 1000);  
    },[refresh]);

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
                <td>{itemProd.codProduto}</td>
                <td>{itemProd.nmProduto}</td>
                <td>{itemProd.idErpColecao}</td>
                {edit ?
                    <>
                        <td><input style={{width: "50px"}} value={itemProd.qtdItem} onChange={(e) => setItemProd({...itemProd, qtdItem: parseInt(e.target.value)})}/></td>
                        <td><input style={{width: "50px"}} value={itemProd.vlUnitario} onChange={(e) => setItemProd({...itemProd, vlUnitario: parseInt(e.target.value)})}/></td>
                        <td><input style={{width: "50px"}} value={itemProd.vlDesconto} onChange={(e) => setItemProd({...itemProd, vlDesconto: parseInt(e.target.value)})}/></td>
                        <td><input style={{width: "50px"}} value={itemProd.vlTotal} onChange={(e) => setItemProd({...itemProd, vlTotal: parseInt(e.target.value)})}/></td>
                    </>
                    :
                    <>
                        <td>{itemProd.qtdItem}</td>
                        <td>{itemProd.vlUnitario}</td>
                        <td>{itemProd.vlDesconto}</td>
                        <td>{itemProd.vlTotal}</td>
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

    return(
        <div className="table-responsive" >
            <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Coleção</th>
                        <th scope="col">Qtd</th>
                        <th scope="col">Vl.Unit</th>
                        <th scope="col">Vl.Desc</th>
                        <th scope="col">Vl.Total</th>
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
