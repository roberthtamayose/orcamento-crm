import { useSelector, useDispatch } from 'react-redux';
import { getTransp, deleteTransp } from '../../store/Transportadora';
import { Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Transportadora = () => {
    const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(getTransp())
    });

    return(
        <Container className='Container'>
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

