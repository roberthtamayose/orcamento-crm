import { configureStore } from '@reduxjs/toolkit'
import transpReduce from './Transportadora'
import condPagReduce from './CondPagamento'
import api from "../services/api";
import { combineReducers } from 'redux'


const reducer = combineReducers({
    transpReduce,
    condPagReduce,
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