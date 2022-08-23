import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectCliente} from '../../store/Clientes';



const SelectCliente = () => {
  const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
  const dispatch = useDispatch()


  return(
    <div style={{flexDirection:"row"}}>
      <p style={{flex:"0.1"}}>Cliente:</p>
      <Form.Select style={{flex:"0.1"}} value={selectCli} onChange={(e) => dispatch(selectCliente(e.target.value))}>
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