import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrcamento, deleteOrcamento } from '../../store/Orcamentos';
import { useNavigate } from "react-router-dom";

const Orcamento = () => {
    const {dataOrcamento} = useSelector(state => state.orcamentoReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrcamento())
    },[]);

    
    const Item = ({item}) => {
        useEffect(() => {
        },[item]);
        const [showModal, setShowModal] = useState(false);

        const Modal = ({item}) => {
            return(
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                            <div className="flex items-start justify-between px-3 py-3 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-sm font-semibold">
                                    Deseja excluir condição de pagamento {item.nomeCondPag}?
                                </h3>
                            </div>
                        {/*body*/}
                        {/*footer*/}
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
                                    onClick={() => dispatch(deleteOrcamento(item, () => setShowModal(false)))}
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
            <tr className="bg-gray-50 border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 "  >
                <td className="py-2 px-6">{item.numOrc}</td>
                <td className="py-2 px-6">{item.numRevisao}</td>
                <td className="py-2 px-6">{item.cliente.nomeCliente}</td>
                <td className="py-2 px-10">{item.ativo}</td>
                <td className="flex flex-row py-2 px-6">
                    <button onClick={() => navigate("/orcamentos/editar", {state: item})} className="bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-2 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button onClick={() => navigate("/orcamentos/editar", {state: item})} className="bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-2 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button onClick={() => setShowModal(true)} className="bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-2 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </td>
                <td>{showModal ? <Modal item={item}/> : null}</td>
            </tr>
        )
    }

    return(              
        <div className="flex flex-col items-center pt-16 h-screen">
            <h1>Orçamentos</h1>
            <div className="flex py-2 px-2 bg-white dark:bg-gray-500 ">
                <div className=" flex flex-row rounded-lg border border-gray-300">
                    <svg className="self-center mx-1 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <input type="text" id="table-search" className=" outline-gray-300 p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg" placeholder="Search for items"/>
                </div>
                <button  onClick={() => navigate("/orcamentos/incluir")} className="bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-200 mx-1 py-2 px-2 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col w-11/12  mb-4 overflow-x-auto overflow-y-auto ">
                <table className="text-sm  text-gray-500 dark:text-gray-400 ">
                    <thead className=" text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="w-1/5 py-2 px-6">
                                Codigo
                            </th>
                            <th scope="col" className="w-1/5 py-2 px-6">
                                Revisão
                            </th>
                            <th scope="col" className="w-2/5 py-2 px-6">
                                Cliente
                            </th>
                            <th scope="col" className="w-1/6 py-2 px-6">
                                Ativo
                            </th>
                            <th scope="col" className=" w-1/6 py-2 px-6">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataOrcamento.map((item, index)=> {
                        return(
                            <Item item={item} key={index}/>
                        )
                    })} 
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default Orcamento