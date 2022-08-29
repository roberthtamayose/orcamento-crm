import { configureStore } from '@reduxjs/toolkit'
import transpReduce from './Transportadora'
import condPagReduce from './CondPagamento'
import filialReduce from './Filiais'
import pedidoReduce from './Pedidos'
import clienteReduce from './Clientes'
import dispReduce from './Disponibilidade'
import carrinhoReduce from './Carrinho'


import api from "../services/api";
import { combineReducers } from 'redux'


const reducer = combineReducers({
    transpReduce,
    condPagReduce,
    filialReduce,
    pedidoReduce,
    clienteReduce,
    dispReduce,
    carrinhoReduce
  })

const store =  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        thunk: {
            extraArgument: api,
        },
        serializableCheck: false,
    }),
})


export default store;