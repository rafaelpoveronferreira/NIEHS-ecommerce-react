import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addNewProduct: (state, action) => {
            state.products.push({...action.payload, quantity:1});
            state.quantity +=1;
            state.total += action.payload.price
          },
        removeProduct: (state, action) => {
            let indexToRemove = state.products.findIndex(e=>e.id==action.payload.id && e.color==action.payload.color)
            
            state.quantity -= state.products[indexToRemove].quantity
            state.total -= state.products[indexToRemove].quantity * state.products[indexToRemove].price
            state.products.splice(indexToRemove, 1)
          },
          changeQuantity: (state, action) => {
            const index = state.products.findIndex(e=>e.id==action.payload.id && e.color==action.payload.color)

            state.products[index].quantity += action.payload.quantity
            state.quantity += action.payload.quantity;
            state.total += action.payload.quantity * action.payload.price
          },
          changeSize: (state, action) => {
            const index = state.products.findIndex(e=>e.id==action.payload.id && e.color==action.payload.color)
 
            state.products[index].size = action.payload.size
          }
        }            
})

export const {addNewProduct, removeProduct, changeQuantity, changeSize} = cartSlice.actions;
export default cartSlice.reducer;