import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialTransp = localStorage.getItem('dataTransp')
  ? JSON.parse(localStorage.getItem('dataTransp'))
  : [0]

const transpReduce = createSlice({
    name: 'transportadora',
    initialState: {
      dataTransp: initialTransp
    },
    reducers: {
      fetchTransp: (state, action) => {
        state.dataTransp = action.payload;
        localStorage.setItem('dataTransp', JSON.stringify(action.payload))
        },

      addTransp: (state, action) => {
        state.dataTransp = [...state.dataTransp, action.payload];
        localStorage.setItem('dataTransp', JSON.stringify(action.payload))
        },

      editTransp: (state, action) => {
          state.dataTransp = [...state.dataTransp, action.payload];
          let index = state.dataTransp.indexOf(action.payload)
          state.dataTransp.splice(index, 1)
          localStorage.setItem('dataTransp', JSON.stringify(action.payload))
        },
      
      delTransp: (state, action) => {
        let index = state.dataTransp.indexOf(action.payload)
        state.dataTransp.splice(index, 1)
        localStorage.setItem('dataTransp', JSON.stringify(action.payload))
      }
    },
  })

  export default transpReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchTransp, addTransp, editTransp, delTransp } = transpReduce.actions
 
export const getTransp = () => async dispatch => {
    try {
      const params = new URLSearchParams([['limit', 10]]);
      await api.get('/transportadoras', { params })
          .then((response) => dispatch(fetchTransp(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const postTransp = (form, cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    await api.post('/transportadoras', form)
        .then((response) => dispatch(addTransp(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const putTransp = (form,cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['idTransp ', form.idTransp]]);
    await api.put(`/transportadoras/${form.idTransp}`, form, params)
        .then((response) => dispatch(editTransp(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const deleteTransp = (form,cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['idTransp ', form.idTransp]]);
    await api.delete(`/transportadoras/${form.idTransp}`, form, params)
        .then(() => dispatch(delTransp(form))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

// export const selectTransp = (state) => state.transportadora