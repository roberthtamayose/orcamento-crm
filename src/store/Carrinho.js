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
        },

      addCarrinho: (state, action) => {
        state.dataCarrinho = [...state.dataCarrinho, action.payload];
        },

      editCarrinho: (state, action) => {
          state.dataCarrinho = [...state.dataCarrinho, action.payload];
          let index = state.dataCarrinho.indexOf(action.payload)
          state.dataCarrinho.splice(index, 1)
        },
      
      delCarrinho: (state, action) => {
        let index = state.dataCarrinho.indexOf(action.payload)
        state.dataCarrinho.splice(index, 1)
      },
      clearCarrinho: (state) => {
        state.dataCarrinho = []
      }

    },
  })

  export default carrinhoReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchCarrinho, addCarrinho, editCarrinho, delCarrinho } = carrinhoReduce.actions
 
export const getCarrinho = (filial, codCliente, codVendedor) => async dispatch => {
    try {
      // const params = new URLSearchParams([['limit', 10]]);
      await api.get('/carrinhos', { params: {filial, codCliente, codVendedor} })
          .then((response) => dispatch(fetchCarrinho(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const postCarrinho = (form) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    let filial = form.filial
    let codVendedor = form.codVendedor
    let codCliente = form.codCliente
    
    // const params = new URLSearchParams([['idFilial', '1'],['idUsuario', '1']]);
    await api.post('/carrinhos', form, { params: {filial, codCliente, codVendedor} })
        .then((response) => {console.log("response....",response);dispatch(addCarrinho(response.data))})
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const putCarrinho = (form,cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['idPedido ', form.idPedido]]);
    await api.put(`/carrinhos/${form.id}`, form, {params: {id:form.id}})
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