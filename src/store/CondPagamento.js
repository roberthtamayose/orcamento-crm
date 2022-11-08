import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialCondPagamento = []

const condPagReduce = createSlice({
    name: 'condPagamento',
    initialState: {
      dataCondPag: initialCondPagamento
    },
    reducers: {
      fetchCondPag: (state, action) => {
        state.dataCondPag = action.payload;
        // localStorage.setItem('dataCondPag', JSON.stringify(action.payload))
        },

      addCondPag: (state, action) => {
        state.dataCondPag = [...state.dataCondPag];
        // localStorage.setItem('dataCondPag', JSON.stringify(action.payload))
        },

      editCondPag: (state, action) => {
          state.dataCondPag = [...state.dataCondPag, action.payload];
          let index = state.dataCondPag.indexOf(action.payload)
          state.dataCondPag.splice(index, 1)
          // localStorage.setItem('dataCondPag', JSON.stringify(action.payload))
        },
      
      delCondPag: (state, action) => {
        let index = state.dataCondPag.indexOf(action.payload)
        state.dataCondPag.splice(index, 1)
        // localStorage.setItem('dataCondPag', JSON.stringify(action.payload))
      }
    },
  })

  export default condPagReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchCondPag, addCondPag, editCondPag, delCondPag } = condPagReduce.actions
 
export const getCondpag = () => async dispatch => {
    try {
      const params = new URLSearchParams([['limit', 10]]);
      await api.get('/condpagamentos', { params })
          .then((response) => dispatch(fetchCondPag(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const postCondpag = (form, cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    await api.post('/condpagamentos', form)
        .then((response) => dispatch(addCondPag(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const putCondpag = (form,cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['id ', form.id]]);
    await api.put(`/condpagamentos/${form.id}`, form, params)
        .then((response) => dispatch(editCondPag(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const deleteCondpag = (form,cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['id ', form.id]]);
    await api.delete(`/condpagamentos/${form.id}`, form, params)
        .then(() => dispatch(delCondPag(form))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}