import { useDispatch } from 'react-redux';
import { postCondpag } from '../../store/CondPagamento';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../../App.css';

const IncluirCondPagamento = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        idErpCondPag: "",
        nmCondPag: "",
        ativo: 1
    })
    return(
        <Container className='Container'>
           <form>
                <div className="mb-3">
                    <label className="form-label">ID Erp</label>
                    <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, idErpCondPag: value})}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Condição de pagamento</label>
                    <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, nmCondPag: value})}}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" onChange={() => {setForm({...form, ativo: form.ativo === 1 ? 0 : 1 })}} />
                    <label className="form-check-label" > Inativada </label>
                </div>
                {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
            </form>
            <button
                aria-label="get condpagamento"
                onClick={() => dispatch(postCondpag(form,navigate("/condPagamento")))}
                >
                Salvar
            </button>
        </Container>
    )
}


export default IncluirCondPagamento

