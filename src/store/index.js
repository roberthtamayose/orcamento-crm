import { configureStore } from '@reduxjs/toolkit'
import transpReduce from './Transportadora'
import condPagReduce from './CondPagamento'
import filialReduce from './Filiais'
import orcamentoReduce from './Orcamentos'
import clienteReduce from './Clientes'
import prodReduce from './produtos'
import carrinhoReduce from './Carrinho'
import userReduce from './Usuarios'
import pedidoReduce from './Pedidos'

import api from "../services/api";
import { combineReducers } from 'redux'


const reducer = combineReducers({
    transpReduce,
    condPagReduce,
    filialReduce,
    orcamentoReduce,
    clienteReduce,
    prodReduce,
    carrinhoReduce,
    userReduce,
    pedidoReduce
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