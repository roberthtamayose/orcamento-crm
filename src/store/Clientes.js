import { createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const initialCliente = [];

const initialSelect = []
// localStorage.getItem("selectCli")
//   ? JSON.parse(localStorage.getItem("selectCli"))
//   : 0;

const clienteReduce = createSlice({
  name: "cliente",
  initialState: {
    dataCliente: initialCliente,
    selectCli: initialSelect,
  },
  reducers: {
    fetchCliente: (state, action) => {
      state.dataCliente = action.payload;
      // localStorage.setItem('dataCliente', JSON.stringify(action.payload))
    },
    setCliente: (state, action) => {
      state.selectCli = action.payload;
      // localStorage.setItem("selectCli", JSON.stringify(action.payload));
    },

  },
});

export default clienteReduce.reducer;

///////////////////////////  Actions ///////////////////////////////

const { fetchCliente, setCliente } = clienteReduce.actions;

export const getCliente = (codVendedor) => async (dispatch) => {
  try {
    await api
      .get("/clientes", {params: {codVendedor}})
      .then((response) => dispatch(fetchCliente(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};

export const selectCliente = (codSharp, nmCliente) => async (dispatch) => {
  try {
    if(codSharp){
      await api
      .get("/clientes/", {params: {codSharp}})
      .then((response) => dispatch(setCliente(response.data[0])));
    }else {
      await api
      .get("/clientes/", {params: {nmCliente}})
      .then((response) => dispatch(setCliente(response.data[0])));
    }
  } catch (e) {
    return console.error(e.message);
  }
};

// export const postCliente = (form, cb) => async dispatch => {
//   try {
//     // const params = new URLSearchParams([['limit', 10]]);
//     await api.post('/cliente', form)
//         .then((response) => dispatch(addCliente(response.data))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

// export const putCliente = (form,cb) => async dispatch => {
//   try {
//     const params = new URLSearchParams([['idCliente ', form.idCliente]]);
//     await api.put(`/cliente/${form.idCliente}`, form, params)
//         .then((response) => dispatch(editCliente(response.data))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }

// export const deleteCliente = (form,cb) => async dispatch => {
//   try {
//     const params = new URLSearchParams([['idCliente ', form.idCliente]]);
//     await api.delete(`/cliente/${form.idCliente}`, form, params)
//         .then(() => dispatch(delCliente(form))).then(cb)
//   }
//   catch (e) {
//       return console.error(e.message);
//   }
// }
