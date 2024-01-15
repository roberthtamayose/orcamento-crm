// import React, { useEffect, useState } from "react";
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectCliente, getCliente} from '../../store/Clientes';



const SelectCliente = ({codVendedor}) => {
  const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCliente(codVendedor))
  },[dispatch]);

  return(
    <div className="flex flex-row">
      <div className="mr-2" >
        <h4>Cliente:</h4>{console.log("codvendedor",codVendedor)}
      </div>
      <div>
        <Form.Select  value={selectCli.nmCliente} onChange={(e) => dispatch(selectCliente('',e.target.value))}>
          <option value={0}>Selecione um cliente</option>
          {dataCliente.map((item) => { 
            return (
              <option className="text-sm" key={item.idErpCliente} value={item.nmCliente}>{item.nmCliente}</option>
            )
          })}
        </Form.Select>
      </div>
    </div>
  )
}


export default SelectCliente;