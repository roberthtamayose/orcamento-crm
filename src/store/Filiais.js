import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialFilial = []

const initialSelect= localStorage.getItem('select')
  ? JSON.parse(localStorage.getItem('select'))
  : {}

const filialReduce = createSlice({
    name: 'filial',
    initialState: {
      dataFilial: initialFilial,
      select: initialSelect
    },
    reducers: {
      fetchFilial: (state, action) => {

        state.dataFilial = action.payload;
        // localStorage.setItem('dataFilial', JSON.stringify(action.payload))
      },
      setFilial: (state, action) => {
        state.select = action.payload;
        localStorage.setItem('select', JSON.stringify(action.payload))
      },
    },
  })

  export default filialReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchFilial, setFilial } = filialReduce.actions
 
export const getFilial = () => async dispatch => {
    try {
      // const params = new URLSearchParams([['limit', 10]]);

      await api.get('/filiais').then((response) => dispatch(fetchFilial(response.data)))
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const selectFilial = (filial) => async dispatch => {
  try {
    dispatch(setFilial(filial))
  }
  catch (e) {
      return console.error(e.message);
  }
}