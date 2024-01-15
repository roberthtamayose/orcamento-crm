import { createSlice } from '@reduxjs/toolkit'
import api from "../services/api";


const initialUser = localStorage.getItem('dataUser')
  ? JSON.parse(localStorage.getItem('dataUser'))
  : []

const userReduce = createSlice({
    name: 'usuario',
    initialState: {
      dataUser: initialUser
    },
    reducers: {
      fetchUser: (state, action) => {
        state.dataUser = action.payload;
        localStorage.setItem('dataUser', JSON.stringify(action.payload))
        },

      addUser: (state, action) => {
        state.dataUser = [...state.dataUser, action.payload];
        // localStorage.setItem('dataUser', JSON.stringify(action.payload))
        },

      editUser: (state, action) => {
          state.dataUser = [...state.dataUser, action.payload];
          let index = state.dataUser.indexOf(action.payload)
          state.dataUser.splice(index, 1)
          // localStorage.setItem('dataUser', JSON.stringify(action.payload))
        },
      
      delUser: (state, action) => {
        let index = state.dataUser.indexOf(action.payload)
        state.dataUser.splice(index, 1)
        // localStorage.setItem('dataUser', JSON.stringify(action.payload))
      }
    },
  })

  export default userReduce.reducer


  ///////////////////////////  Actions ///////////////////////////////

const { fetchUser, addUser, editUser, delUser } = userReduce.actions
 
export const getUser = (form, cb) => async dispatch => {
    try {
    console.log("FOI!!!!!")
        const params = new URLSearchParams([['emailUsuario', form.email]]);
        const funcRt = (response) => {
            dispatch(fetchUser(response.data)).then(()=>cb())
            
        }
        await api.get('/usuarios', { params })
            .then((response) => {response.data[0] ? response.data[0].senhaUsuario === form.senha ? funcRt(response) : console.log("Errou a senha"): console.log("Errou o email")})
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const postUser = (form, cb) => async dispatch => {
  try {
    // const params = new URLSearchParams([['limit', 10]]);
    await api.post('/usuarios', form)
        .then((response) => dispatch(addUser(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const putUser = (form,cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['idTransp ', form.idTransp]]);
    await api.put(`/usuarios/${form.idTransp}`, form, params)
        .then((response) => dispatch(editUser(response.data))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

export const deleteUser = (form,cb) => async dispatch => {
  try {
    const params = new URLSearchParams([['idTransp ', form.idTransp]]);
    await api.delete(`/usuarios/${form.idTransp}`, form, params)
        .then(() => dispatch(delUser(form))).then(cb)
  }
  catch (e) {
      return console.error(e.message);
  }
}

// export const selectTransp = (state) => state.transportadora