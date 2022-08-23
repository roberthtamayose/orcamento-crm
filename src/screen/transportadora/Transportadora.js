import { useSelector, useDispatch } from 'react-redux';
import { getTransp, deleteTransp } from '../../store/Transportadora';
import { Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const Transportadora = () => {
    const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(true);
    
    useEffect(() => {
        dispatch(getTransp())
    },[refresh]);

    return(
        <Container className='Container'>
            <h1>Transportadora</h1>
            <button
                aria-label="get transportadora"
                onClick={() => setRefresh(!refresh)}
                style={{margin: '10px'}}
                >
                Refresh
            </button> 
            <button
                aria-label="get transportadora"
                onClick={() => navigate("/transportadora/incluir")}
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
                        {dataTransp.map((item, key)=> {
                            return(
                                <tr key={key} className={key%2 === 1 ? "table-active":null}>
                                    <td>{item.idErpTransp}</td>
                                    <td>{item.nmTransp}</td>
                                    <td>{item.ativo}</td>
                                    <td>
                                        <a onClick={() => navigate("/transportadora/editar", {state: item})} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true" style={{marginRight:"5px"}}>Editar</a>
                                        <a onClick={() => dispatch(deleteTransp(item, navigate("/transportadora")))} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true">Deletar</a>
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


export default Transportadora

