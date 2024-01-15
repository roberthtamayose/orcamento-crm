import { useSelector, useDispatch } from 'react-redux';
import { getTransp, deleteTransp } from '../../store/Transportadora';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const Transportadora = () => {
    const {dataTransp} = useSelector(state => state.transpReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getTransp())
    },[]);

    const Item = ({item, index}) => {
        const [showModal, setShowModal] = useState(false);

        const Modal = ({item}) => {
            return(
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between px-3 py-3 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-sm font-semibold">
                                    Deseja excluir transportadora {item.nomeTransp}?
                                </h3>
                            </div>
                            <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Não
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => dispatch(deleteTransp(item, () => {setShowModal(false)}))}
                                >
                                    Sim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return(
            <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        <span className="font-medium">{item.codTransp}</span>
                    </div>
                </td>
                <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                        <span>{item.nomeTransp}</span>
                    </div>
                </td>
                <td className="py-3 px-6 text-center">
                    {item.ativo === "S" ? 
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Ativo</span>
                    :
                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Desativado</span>
                    }
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <div onClick={() => navigate("/transportadoras/editar", {state: item})} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div onClick={() => setShowModal(true)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                    {showModal ? <Modal item={item}/> : null}
                </td>
            </tr>
        )
    }

    return(
            <div className="min-w-screen min-h-screen mt-10 flex justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-4/6">
                    <div className=" bg-gray-100 shadow-lg rounded my-6">
                        <div className=" flex flex-col items-center ">
                            <h1>Transportadora</h1>        
                            <div className=" flex flex-row w-full justify-between mb-1 px-1">
                                <button  onClick={() => navigate("/transportadoras/incluir")} className= "bg-orange-400 border-2 border-orange-400 hover:border-orange-300 hover:bg-orange-300 py-2 px-2 rounded inline-flex items-center">
                                    Incluir 
                                </button>
                                <div className="flex flex-row rounded-lg border border-gray-300">
                                    <svg className="self-center w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    <input type="text" id="table-search" className=" outline-gray-300 p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg" placeholder="Search for items"/>
                                </div>
                            </div>
                            <div className=" w-full overflow-x-auto overflow-y-auto ">
                                <table className=" min-w-max w-full table-auto ">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Codigo</th>
                                            <th className="py-3 px-6 text-left">Nome</th>
                                            <th className="py-3 px-6 text-center">Status</th>
                                            <th className="py-3 px-6 text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                    {dataTransp.map((item, index) => {
                                        return(
                                            <Item item={item} index={index}/>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default Transportadora