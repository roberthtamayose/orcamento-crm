import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialOrcamento = []

const orcamentoReduce = createSlice({
    name: 'orcamento',
    initialState: {
      dataOrcamento: initialOrcamento
    },
    reducers: {
      fetchOrcamento: (state, action) => {
        state.dataOrcamento = action.payload;
        // localStorage.setItem('dataPedido', JSON.stringify(action.payload))
      },

      addOrcamento: (state, action) => {
        state.dataOrcamento = [...state.dataOrcamento, action.payload];
        // localStorage.setItem('dataOrcamento', JSON.stringify(action.payload))
      },

      editOrcamento: (state, action) => {
        let index = state.dataOrcamento.findIndex(x => x.id === action.id)
        state.dataOrcamento[index] = action.payload
      },
      
      delOrcamento: (state, action) => {
        state.dataOrcamento = state.dataOrcamento.filter((item) => item.id !== action.payload.id)
      }
    },
  })

  export default orcamentoReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

// const { fetchPedido, addPedido, editPedido, delPedido } = pedidoReduce.actions
const { fetchOrcamento, addOrcamento, editOrcamento, delOrcamento} = orcamentoReduce.actions

 
export const getOrcamento = (filial) => async dispatch => {
    try {
      const params = new URLSearchParams([['filial', filial],['limit', 10],['filter', ['numOrc', 'numRevisao']]]);
      await api.get('/orcamentos', { params })
          .then((response) => dispatch(fetchOrcamento(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const postOrcamento = (form, cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    await api.post('/orcamentos', form)
        .then((response) => dispatch(addOrcamento(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const putOrcamento = (form, cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['id ', form.id]]);
    await api.put(`/orcamentos/${form.id}`, form, params)
        .then((response) => dispatch(editOrcamento(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const deleteOrcamento = (form, cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['id ', form.id]]);
    await api.delete(`/orcamentos/${form.id}`, form, params)
        .then(() => dispatch(delOrcamento(form))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}