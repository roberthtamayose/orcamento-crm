import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialCarrinho = []

const carrinhoReduce = createSlice({
    name: 'carrinho',
    initialState: {
      dataCarrinho: initialCarrinho
    },
    reducers: {
      fetchCarrinho: (state, action) => {
        state.dataCarrinho = action.payload;
        // localStorage.setItem('dataCarrinho', JSON.stringify(action.payload))
        },

      addCarrinho: (state, action) => {
        state.dataCarrinho = [...state.dataCarrinho, action.payload];
        // localStorage.setItem('dataCarrinho', JSON.stringify(action.payload))
        },

      editCarrinho: (state, action) => {
          state.dataCarrinho = [...state.dataCarrinho, action.payload];
          let index = state.dataCarrinho.indexOf(action.payload)
          state.dataCarrinho.splice(index, 1)
          // localStorage.setItem('dataCarrinho', JSON.stringify(action.payload))
        },
      
      delCarrinho: (state, action) => {
        let index = state.dataCarrinho.indexOf(action.payload)
        state.dataCarrinho.splice(index, 1)

        // localStorage.setItem('dataCarrinho', JSON.stringify(action.payload))
      }
    },
  })

  export default carrinhoReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchCarrinho, addCarrinho, editCarrinho, delCarrinho } = carrinhoReduce.actions
 
export const getCarrinho = () => async dispatch => {
    try {
      let idFilial = 1
      let idUsuario = 1
      // const params = new URLSearchParams([['limit', 10]]);
      await api.get('/carrinhos', { params: {idFilial, idUsuario} })
          .then((response) => dispatch(fetchCarrinho(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const postCarrinho = (form) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    let idFilial = 1
    let idUsuario = 1
    // const params = new URLSearchParams([['idFilial', '1'],['idUsuario', '1']]);
    await api.post('/carrinhos', form, { params: {idFilial, idUsuario} })
        .then((response) => {console.log("response....",response);dispatch(addCarrinho(response.data))})
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const putCarrinho = (form,cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['idPedido ', form.idPedido]]);
    await api.put(`/carrinhos/${form.idPedido}`, form, {params: {idPedido:form.idPedido}})
        .then((response) => dispatch(editCarrinho(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const deleteCarrinho = (idPedido, idItem , cb) => async dispatch => {
  try {
    await api.delete(`/carrinhos/${idPedido}/${idItem}`, {params: {idPedido, idItem}})
        .then(() => dispatch(delCarrinho(idPedido, idItem))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}