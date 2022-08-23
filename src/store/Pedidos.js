import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialPedido = []

const pedidoReduce = createSlice({
    name: 'pedidos',
    initialState: {
      dataPedido: initialPedido
    },
    reducers: {
      fetchPedido: (state, action) => {
        state.dataPedido = action.payload;
        // localStorage.setItem('dataPedido', JSON.stringify(action.payload))
        },

      // addPedido: (state, action) => {
      //   state.dataPedido = [...state.dataPedido, action.payload];
      //   localStorage.setItem('dataPedido', JSON.stringify(action.payload))
      //   },

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

  export default pedidoReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchPedido, addPedido, editPedido, delPedido } = pedidoReduce.actions
 
export const getPedido = () => async dispatch => {
    try {
      const params = new URLSearchParams([['limit', 10]]);
      await api.get('/pedidos', { params })
          .then((response) => dispatch(fetchPedido(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

// export const postPedido = (form, cb) => async dispatch => {
//   try {
//     // const params = new URLSearchParams([['limit', 10]]);
//     await api.post('/pedidos', form)
//         .then((response) => dispatch(addPedido(response.data))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

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