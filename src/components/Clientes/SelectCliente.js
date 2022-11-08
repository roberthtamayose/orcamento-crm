// import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectCliente} from '../../store/Clientes';



const SelectCliente = () => {
  const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
  const dispatch = useDispatch()


  return(
    <div className="flex flex-row">
      <div className="mr-2" >
        <h4>Cliente:</h4>
      </div>
      <div>
        <Form.Select  value={selectCli} onChange={(e) => dispatch(selectCliente(e.target.value))}>
          <option value={0}>Selecione um cliente</option>
          {dataCliente.map((item, key ) => { 
            return (
              <option className="text-sm" key={key} value={item.id}>{item.nomeCliente}</option>
            )
          })}
        </Form.Select>
      </div>
    </div>
  )
}


export default SelectCliente;