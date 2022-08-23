import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectCliente} from '../../store/Clientes';



const SelectCliente = () => {
  const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
  const dispatch = useDispatch()


  return(
    <div>
      <h2 className="text-center display-4">Escolha um cliente:</h2>
      <Form.Select aria-label="Default select example" value={selectCli} onChange={(e) => dispatch(selectCliente(e.target.value))}>
        <option>Selecione um cliente</option>
        {dataCliente.map((item, key ) => { 
          return (
            <option key={key} value={item.idCliente}>{item.nmCliente}</option>
          )
        })}
      </Form.Select>
    </div>
  )
}


export default SelectCliente;