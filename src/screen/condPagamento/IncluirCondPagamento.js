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
        codCondPag: "",
        nomemCondPag: "",
        ativo: "S"
    })
    return(
        <div className="flex flex-col w-full items-center pt-20  h-screen" >
            <div className="flex flex-col px-2 w-full lg:w-2/4" >
                <form>
                    <div className="mb-3">
                        <label className="form-label">ID Erp</label>
                        <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, codCondPag: value})}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Condição de pagamento</label>
                        <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, nomeCondPag: value})}}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" onChange={() => {setForm({...form, ativo: form.ativo === "S" ? "N" : "S" })}} />
                        <label className="form-check-label" > Inativada </label>
                    </div>
                    {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
                </form>
                <button
                    aria-label="get condpagamento"
                    onClick={() => dispatch(postCondpag(form, navigate(-1)))}
                    >
                    Salvar
                </button>
            </div>
        </div>
    )
}


export default IncluirCondPagamento

