import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialProd =  []

const prodReduce = createSlice({
    name: 'produto',
    initialState: {
      initialProd: initialProd,
    },
    reducers: {
      fetchDispProd: (state, action) => {
        state.initialProd = action.payload;
        // localStorage.setItem('initialProd', JSON.stringify(action.payload))
        },

      

      // addTransp: (state, action) => {
      //   state.initialProd = [...state.initialProd, action.payload];
      //   localStorage.setItem('initialProd', JSON.stringify(action.payload))
      //   },

      // editTransp: (state, action) => {
      //     state.initialProd = [...state.initialProd, action.payload];
      //     let index = state.initialProd.indexOf(action.payload)
      //     state.initialProd.splice(index, 1)
      //     localStorage.setItem('initialProd', JSON.stringify(action.payload))
      //   },
      
      // delTransp: (state, action) => {
      //   let index = state.initialProd.indexOf(action.payload)
      //   state.initialProd.splice(index, 1)
      //   localStorage.setItem('initialProd', JSON.stringify(action.payload))
      // }
    },
  })

export default prodReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchDispProd, fetchDispEst } = prodReduce.actions
 
export const getDispProd = () => async dispatch => {
    try {
      const params = new URLSearchParams([["filial", "02"]]);
      await api.get('/produtos', { params })
          .then((response) => dispatch(fetchDispProd(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const getDispEst = (filial, codProduto) => async dispatch => {
  try {
    const params = new URLSearchParams([['idFilial', filial],['codProduto',codProduto]]);
    await api.get('/disponibilidades/produtos', { params })
        .then((response) => dispatch(fetchDispEst(response.data)))
  }
  catch (e) {
      return console.error(e.message);
  }
}

// export const postTransp = (form, cb) => async dispatch => {
//   try {
//     // const params = new URLSearchParams([['limit', 10]]);
//     await api.post('/transportadoras', form)
//         .then((response) => dispatch(addTransp(response.data))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

// export const putTransp = (form,cb) => async dispatch => {
//   try {
//     const params = new URLSearchParams([['idTransp ', form.idTransp]]);
//     await api.put(`/transportadoras/${form.idTransp}`, form, params)
//         .then((response) => dispatch(editTransp(response.data))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

// export const deleteTransp = (form,cb) => async dispatch => {
//   try {
//     const params = new URLSearchParams([['idTransp ', form.idTransp]]);
//     await api.delete(`/transportadoras/${form.idTransp}`, form, params)
//         .then(() => dispatch(delTransp(form))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

// export const selectTransp = (state) => state.transportadora