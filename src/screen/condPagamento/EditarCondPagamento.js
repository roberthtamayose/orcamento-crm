import { useDispatch } from 'react-redux';
import { putCondpag } from '../../store/CondPagamento';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate , useLocation} from "react-router-dom";

import '../../App.css';

const EditarCondPagamento = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {state}  = useLocation();
    const [form, setForm] = useState({
        idCondPag: state.idCondPag,
        idErpCondPag: state.idErpCondPag,
        nmCondPag: state.nmCondPag,
        ativo: state.ativo
    })

    return(
        <Container className='Container'>
           <form>
                <div className="mb-3">
                    <label className="form-label">ID Erp</label>
                    <input type="text" className="form-control" value={form.idErpCondPag} onChange={(event) => {const value = event.target.value; setForm({...form, idErpCondPag: value})}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Condição de pagamento</label>
                    <input type="text" className="form-control" value={form.nmCondPag} onChange={(event) => {const value = event.target.value; setForm({...form, nmCondPag: value})}}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" checked={form.ativo === 1? "checked": ""} onChange={() => {setForm({...form, ativo: form.ativo === 1 ? 0 : 1 })}} />
                    <label className="form-check-label" > Inativada </label>
                </div>
                {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
            </form>
            <button
                aria-label="get condPagamento"
                onClick={() => dispatch(putCondpag(form, navigate("/condPagamento")))}
                >
                Salvar
            </button>
        </Container>
    )
}


export default EditarCondPagamento

