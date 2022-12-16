///////////////// HOOKS //////////////
import React, { useState } from "react";
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
import SelectCliente from '../../components/Clientes/SelectCliente'
import EditarCarrinho from './EditarCarrinho'
///////////////// CSS //////////////
import '../../App.css';

const EditarOrcamento = (navigation) => {
    const [refresh, setRefresh] = useState(true);

    const {state} = useLocation();
    const dispatch = useDispatch()

    console.log("orcamento....", state)

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
            <tr className={props.index%2 === 1 ? "table-active" : null}>
                <td>{itemProd.produto.codProd}</td>
                <td>{itemProd.produto.nomeProd}</td>
                <td>{itemProd.produto.colecao}</td>
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

    return(
        <div className="flex flex-col items-center pt-16 h-screen">
            <h1>Editar orçamento</h1>
            <SelectCliente/>
            <div className="flex flex-col items-center">
                    <div className="flex flex-col">
                        <Field
                            type="text"
                            readOnly={true}
                            label="numOrc"
                            initialValue={state.numOrc}
                        />
                        <Field
                            type="text"
                            label="Teste"
                        />
                    </div>
            </div>
            <><br/></>
            
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
                        {state.item.map((item, index)=> {
                            return(
                                <ItemProdCarrinho item={item} key={index}/>
                            )
                        })}
                        </tbody>
                </table>
            </div>
        </div>
    )
}


export default EditarOrcamento