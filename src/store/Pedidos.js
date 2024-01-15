import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialPedido = []
const initialPedidoItem = []


const pedidoReduce = createSlice({
    name: 'pedidos',
    initialState: {
      dataPedido: initialPedido,
      dataPedidoItem: initialPedidoItem
    },
    reducers: {
      fetchPedido: (state, action) => {
        state.dataPedido = action.payload;
        // localStorage.setItem('dataPedido', JSON.stringify(action.payload))
      },
      
      fetchPedidoItem: (state, action) => {
        state.dataPedidoItem = action.payload;
        // localStorage.setItem('dataPedido', JSON.stringify(action.payload))
      },
    },
  })

  export default pedidoReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

// const { fetchPedido, addPedido, editPedido, delPedido } = pedidoReduce.actions
const { fetchPedido, fetchPedidoItem } = pedidoReduce.actions

 
export const getPedido = () => async dispatch => {
    try {
      const params = new URLSearchParams([['limit', 10]]);
      await api.get('/pedidos', { params })
          // .then((response) => console.log("response.....",response.data))
          .then((response) => dispatch(fetchPedido(response.data)))

    }
    catch (e) {
        return console.error(e.message);
    }
}

export const getPedidoItem = (id) => async dispatch => {
  try {
    const params = new URLSearchParams([['idPedido',id],['limit', 10]]);
    await api.get('/pedidos/itens', { params })
        .then((response) => dispatch(fetchPedidoItem(response.data)))
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const postPedido = (form,cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    await api.post('/pedidos', form)
        .then((response) => {if(response.status === 200){return cb} })
        // .then((response) => dispatch(addPedido(response.data)))

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