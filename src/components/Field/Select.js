// import React, { useEffect, useState } from "react";
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';


const SelectCliente = (label, data, value, onchange, placeholder) => {
//   const { dataCliente, selectCli } = useSelector(state => state.clienteReduce)
  const dispatch = useDispatch()

  return(
    <Form.Group className="mb-3" >
        <Form.Label>{label}</Form.Label>
        <Form.Select  value={value} onChange={(e) => dispatch(onchange(e.target.value))}>
          <option value={0}>{placeholder}</option>
          {data.map((item, key ) => { 
            return (
              <option className="text-sm" key={key} value={item.id}>{item.nomeCliente}</option>
            )
          })}
        </Form.Select>
    </Form.Group>
  )
}


export default SelectCliente;
