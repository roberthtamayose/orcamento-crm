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

      // editPedido: (state, action) => {
      //     state.dataPedido = [...state.dataPedido, action.payload];
      //     let index = state.dataPedido.indexOf(action.payload)
      //     state.dataPedido.splice(index, 1)
      //     localStorage.setItem('dataPedido', JSON.stringify(action.payload))
      //   },
      
      // delPedido: (state, action) => {
      //   let index = state.dataPedido.indexOf(action.payload)
      //   state.dataPedido.splice(index, 1)
      //   localStorage.setItem('dataPedido', JSON.stringify(action.payload))
      // }
    },
  })

  export default orcamentoReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

// const { fetchPedido, addPedido, editPedido, delPedido } = pedidoReduce.actions
const { fetchOrcamento, addOrcamento } = orcamentoReduce.actions

 
export const getOrcamento = () => async dispatch => {
    try {
      const params = new URLSearchParams([['limit', 10],['filter', ['numOrc', 'numRevisao']]]);
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

// export const putPedido = (form,cb) => async dispatch => {
//   try {
//     const params = new URLSearchParams([['idPedido ', form.idPedido]]);
//     await api.put(`/pedidos/${form.idPedido}`, form, params)
//         .then((response) => dispatch(editPedido(response.data))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

// export const deletePedido = (form,cb) => async dispatch => {
//   try {
//     const params = new URLSearchParams([['idPedido ', form.idPedido]]);
//     await api.delete(`/pedidos/${form.idPedido}`, form, params)
//         .then(() => dispatch(delPedido(form))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }