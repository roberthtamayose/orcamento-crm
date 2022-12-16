import { useDispatch } from 'react-redux';
import { putCondpag } from '../../store/CondPagamento';
import { useState } from 'react';
import { useNavigate , useLocation} from "react-router-dom";

import '../../App.css';

const EditarCondPagamento = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {state}  = useLocation();
    const [form, setForm] = useState({
        id: state.id,
        codCondPag: state.codCondPag,
        nomeCondPag: state.nomeCondPag,
        ativo: state.ativo
    })

    return(
        <div className="flex flex-col w-full items-center pt-20  h-screen" >
            <div className="flex flex-col px-2 w-full lg:w-2/4" >
                <form>
                    <div className="mb-3">
                        <label className="form-label">ID Erp</label>
                        <input type="text" className="form-control" value={form.codCondPag} onChange={(event) => {const value = event.target.value; setForm({...form, codCondPag: value})}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Condição de pagamento</label>
                        <input type="text" className="form-control" value={form.nomeCondPag} onChange={(event) => {const value = event.target.value; setForm({...form, nomeCondPag: value})}}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={form.ativo === "N"? "checked": ""} onChange={() => {setForm({...form, ativo: form.ativo === "S" ? "N" : "S" })}} />
                        <label className="form-check-label" > Inativada </label>
                    </div>
                </form>
                <button
                    aria-label="get condPagamento"
                    onClick={() => dispatch(putCondpag(form, navigate(-1)))}
                >
                    Salvar
                </button>
            </div>
        </div>
    )
}


export default EditarCondPagamento

