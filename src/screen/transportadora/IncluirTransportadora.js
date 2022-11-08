import { useDispatch } from 'react-redux';
import { postTransp } from '../../store/Transportadora';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../../App.css';

const IncluirTransportadora = () => {
    // const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        codTransp: "",
        nomeTransp: "",
        ativo: "S"
    })
    return(
        <div className="flex flex-col w-full items-center pt-20  h-screen" >
            <div className="flex flex-col px-2 w-full lg:w-2/4" >
                <form>
                        <div className="mb-3">
                            <label className="form-label">ID Erp</label>
                            <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, codTransp: value})}}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nome da transportadora</label>
                            <input type="text" className="form-control"  onChange={(event) => {const value = event.target.value; setForm({...form, nomeTransp: value})}}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" onChange={() => {setForm({...form, ativo: form.ativo === "S" ? "N" : "S" })}} />
                            <label className="form-check-label" > Inativada </label>
                        </div>
                        {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
                    </form>
                    <button
                        className="self-center bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-5 rounded items-center"
                        onClick={() => dispatch(postTransp(form, navigate(-1)))}
                    >
                        Salvar
                    </button>
            </div>
        </div>
    )
}


export default IncluirTransportadora

