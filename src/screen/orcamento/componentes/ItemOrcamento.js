import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { getPedido } from '../../store/Pedidos';
import { Table } from 'react-bootstrap';
import api from "../../../services/api";

const ItemOrcamento = ({idPedido}) => {
    const [itemPedido, setItemPedido] = useState([]);

    const getItem = async (idPedido) => {
        const params = new URLSearchParams([['idPedido',idPedido]]);
        let response = await api.get('/pedidos/itens', { params })
        setItemPedido(response.data)
    }

    useEffect(() => {
        getItem(idPedido)
    },[]);

    return(
        <div>
            <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Código</th>
                                <th>Produto</th>
                                <th>UM</th>
                                <th>Coleção</th>
                                <th>Quantidade</th>
                                <th>P.Unitário</th>
                                <th>Total</th>


                            </tr>
                        </thead>
                        <tbody>
                            {itemPedido.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.codProduto}</td>
                                    <td>{item.nmProduto}</td>
                                    <td>{item.um}</td>
                                    <td>{item.codColecao}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.preco}</td>
                                    <td>{item.total}</td>

                                </tr>
                            )})
                            }
                        </tbody>
                    
            </Table>
        </div>
    )
}
export default ItemOrcamento