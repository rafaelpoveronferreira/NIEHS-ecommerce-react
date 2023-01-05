import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        shipping: {},
        payment: {
          type: '',
          name: '',
          cardnumber: '',
          expiry: '',
          total:'',
          ccv: ''
        },
        clientSecret: null
    },
    reducers: {
        setShipping: (state, action) => {
            state.shipping = action.payload
          },
        setPayment: (state, action) => {
            state.payment = action.payload;
        },
        setPaymentIntent: (state, action) => {
          state.clientSecret = action.payload;
        }
        }            
})

export const {setShipping, setPayment, setPaymentIntent} = orderSlice.actions;
export default orderSlice.reducer;