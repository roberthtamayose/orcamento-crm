import { useDispatch } from 'react-redux';
import { putTransp } from '../../store/Transportadora';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate , useLocation} from "react-router-dom";

import '../../App.css';

const EditarTransportadora = () => {
    // const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {state}  = useLocation();
    const [form, setForm] = useState({
        idTransp: state.idTransp,
        idErpTransp: state.idErpTransp,
        nmTransp: state.nmTransp,
        ativo: state.ativo
    })

    return(
        <Container className='Container'>
           <form>
                <div className="mb-3">
                    <label className="form-label">ID Erp</label>
                    <input type="text" className="form-control" value={form.idErpTransp} onChange={(event) => {const value = event.target.value; setForm({...form, idErpTransp: value})}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome da transportadora</label>
                    <input type="text" className="form-control" value={form.nmTransp} onChange={(event) => {const value = event.target.value; setForm({...form, nmTransp: value})}}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" checked={form.ativo === 1? "checked": ""} onChange={() => {setForm({...form, ativo: form.ativo === 1 ? 0 : 1 })}} />
                    <label className="form-check-label" > Inativada </label>
                </div>
                {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
            </form>
            <button
                aria-label="get transportadora"
                onClick={() => dispatch(putTransp(form, navigate("/transportadora")))}
                >
                Salvar
            </button>
        </Container>
    )
}


export default EditarTransportadora

