import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialProd = localStorage.getItem('initialProd')
  ? JSON.parse(localStorage.getItem('initialProd'))
  : [0]

const initialEst = localStorage.getItem('initialProd')
  ? JSON.parse(localStorage.getItem('initialProd'))
  : [0]

const dispReduce = createSlice({
    name: 'produto',
    initialState: {
      initialProd: initialProd,
      initialEst: initialEst
    },
    reducers: {
      fetchDispProd: (state, action) => {
        state.initialProd = action.payload;
        localStorage.setItem('initialProd', JSON.stringify(action.payload))
        },

      fetchDispEst: (state, action) => {
        state.initialEst = action.payload;
        localStorage.setItem('initialEst', JSON.stringify(action.payload))
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

export default dispReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchDispProd, fetchDispEst } = dispReduce.actions
 
export const getDispProd = () => async dispatch => {
    try {
      const params = new URLSearchParams([['limit', 10]]);
      await api.get('/disponibilidades/produtos', { params })
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