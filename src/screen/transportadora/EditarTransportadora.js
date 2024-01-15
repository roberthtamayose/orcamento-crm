import { useDispatch } from 'react-redux';
import { putTransp } from '../../store/Transportadora';
import { useState } from 'react';
import { useNavigate , useLocation} from "react-router-dom";

const EditarTransportadora = () => {
    // const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {state}  = useLocation();
    const [form, setForm] = useState({
        id: state.id,
        codTransp: state.codTransp,
        nomeTransp: state.nomeTransp,
        ativo: state.ativo
    })

    return(
        <div className="flex flex-col w-full items-center pt-20  h-screen" >
            <div className="flex flex-col px-2 w-full lg:w-2/4" >
                <form>
                    <div className="mb-3">
                        <label className="form-label">ID Erp</label>
                        <input type="text" className="form-control" value={form.codTransp} onChange={(event) => {const value = event.target.value; setForm({...form, codTransp: value})}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nome da transportadora</label>
                        <input type="text" className="form-control" value={form.nomeTransp} onChange={(event) => {const value = event.target.value; setForm({...form, nomeTransp: value})}}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={form.ativo === "N"? "checked": ""} onChange={() => {setForm({...form, ativo: form.ativo === "N" ? "S" : "N" })}} />
                        <label className="form-check-label" > Inativada </label>
                    </div>
                    {/* <button className="btn btn-primary" onClick={() => console.log(form)}>Salvar</button> */}
                </form>
                <button
                    className="self-center bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-5 rounded items-center"
                    onClick={() => dispatch(putTransp(form, navigate(-1)))}
                >
                    Salvar
                </button>
                {/* <button
                    className="bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-2 rounded inline-flex items-center"
                    onClick={() =>  navigate(-1)}
                    >
                    Voltar
                </button> */}
            </div>
        </div>
    )
}


export default EditarTransportadora

