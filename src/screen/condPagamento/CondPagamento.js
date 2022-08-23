import { useSelector, useDispatch } from 'react-redux';
import { getCondpag, deleteCondpag } from '../../store/CondPagamento';
import { Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const CondPagamento = () => {
    const {dataCondPag} = useSelector(state => state.condPagReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        dispatch(getCondpag())
    },[refresh]);

    return(
        <Container className='Container'>
            {/* <h1>Cond. Pagamento</h1> */}
            <button
                aria-label="get condpagamento"
                onClick={() => setRefresh(!refresh)}
                style={{margin: '10px'}}
                >
                Refresh
            </button> 
            <button
                aria-label="get condpagamento"
                onClick={() => navigate("/condPagamento/incluir")}
                style={{margin: '10px'}}
                >
                Incluir
            </button> 
            <div className="table-responsive ">
                <table className="table table-bordered" >
                        <thead>
                            <tr>
                            <th scope="col">ID ERP</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataCondPag.map((item, key)=> {
                            return(
                                <tr key={key} className={key%2 === 1 ? "table-active":null}>
                                    <td>{item.idErpCondPag}</td>
                                    <td>{item.nmCondPag}</td>
                                    <td>{item.ativo}</td>
                                    <td>
                                        <a onClick={() => navigate("/condPagamento/editar", {state: item})} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>Editar</a>
                                        <a onClick={() => dispatch(deleteCondpag(item, navigate("/condPagamento")))} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true">Deletar</a>
                                    </td>
                                </tr>
                            )
                        })} 
                        </tbody>
                </table>
            </div>

        </Container>
    )
}


export default CondPagamento

