import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getPedido } from '../../store/Pedidos';
import { Accordion } from 'react-bootstrap';
import ItemOrcamento from './componentes/ItemOrcamento';

const Orcamento = () => {
    const {select} = useSelector(state => state.filialReduce)
    const {dataPedido} = useSelector(state => state.pedidoReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPedido())
    },[select]);

    return(              
        // <div className="flex flex-col items-center pt-16 h-screen">
        
        //     <div className="w-full lg:w-4/6">
        <div className="flex flex-col items-center pt-16 h-screen">
            <h1>Orçamentos</h1>
                        <div className="flex flex-row w-full md:w-3/4 justify-center">
                            <button  onClick={() => navigate("/orcamentos/incluir")} className= " bg-orange-400 border-2 border-orange-400 hover:border-orange-300 hover:bg-orange-300 py-2 px-2 rounded mx-1">
                                Incluir 
                            </button>
                            <div className="flex flex-row rounded-lg border border-gray-300  mx-1">
                                <svg className="self-center w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                <input type="text" id="table-search" className=" outline-gray-300 p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg" placeholder="Search for items"/>
                            </div>
                        </div>
                        {/* <Accordion flush className="w-full   overflow-x-auto overflow-y-auto "> */}
                        <Accordion flush className="w-full md:w-3/4">

                            {dataPedido.map((item, key) => {
                            return(
                                <Accordion.Item key={item.filial+item.codPedido} eventKey={item.filial+item.codPedido}  > 
                                {/* onClick={() => console(item.idErpProduto)}> */}
                                    <Accordion.Header ><p className="text-sm mr-2 my-0">{'Filial: '+ item.filial +' - '+ 'Pedido: '+ item.codPedido }</p> </Accordion.Header>
                                    <Accordion.Body style={{overflow:"auto"}} >
                                        <ItemOrcamento idPedido={item.codPedido} key={item.codPedido}/>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )})}
                        </Accordion>
            {/* </div> */}
        </div>
    )
}



export default Orcamento