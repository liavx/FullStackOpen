import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice ({
    name:'notification',
    initialState,
    reducers:{
        setNotification(_state,action){
            return action.payload
        },
        clearNotification(){
            return initialState
        }
    }
})

let currentTimeout

export const showNotification = (msg, ms = 5000) => (dispatch) => {
  if (currentTimeout) clearTimeout(currentTimeout)
  dispatch(setNotification(msg))
  currentTimeout = setTimeout(() => {
    dispatch(clearNotification())
    currentTimeout = null
  }, ms)
}

export const { setNotification , clearNotification } = notificationSlice.actions
export default notificationSlice.reducer


