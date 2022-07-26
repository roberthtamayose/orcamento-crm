import { useDispatch } from 'react-redux';
import { postTransp } from '../../store/Transportadora';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../../App.css';

const IncluirTransportadora = () => {
    // const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        idErpTransp: "",
        nmTransp: "",
        ativo: 1
    })
    return(
        <Container className='Container'>
           <form>
                <div className="mb-3">
                    <label className="form-label">ID Erp</label>
                    <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, idErpTransp: value})}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome da transportadora</label>
                    <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, nmTransp: value})}}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" onChange={() => {setForm({...form, ativo: form.ativo === 1 ? 0 : 1 })}} />
                    <label className="form-check-label" > Inativada </label>
                </div>
                {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
            </form>
            <button
                aria-label="get transportadora"
                onClick={() => dispatch(postTransp(form,navigate("/transportadora")))}
                >
                Salvar
            </button>
        </Container>
    )
}


export default IncluirTransportadora

