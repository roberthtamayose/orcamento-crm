// import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectCliente} from '../../store/Clientes';



const SelectCliente = () => {
  const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
  const dispatch = useDispatch()


  return(
    <div style={{ display: "flex", flexDirection:"row"}}>
      <div style={{ marginRight: "10px", justifySelf:"center"}}>
        <h4>Cliente:</h4>
      </div>
      <div>
        <Form.Select value={selectCli} onChange={(e) => dispatch(selectCliente(e.target.value))}>
          <option>Selecione um cliente</option>
          {dataCliente.map((item, key ) => { 
            return (
              <option key={key} value={item.idCliente}>{item.nmCliente}</option>
            )
          })}
        </Form.Select>
      </div>
    </div>
  )
}


export default SelectCliente;