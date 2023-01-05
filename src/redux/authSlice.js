import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false
    },
    reducers: {
        loginStart: (state, action) => {
            state.isLoading = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isLoading = false
            state.error = false
        },
        loginError: (state, action) => {
            state.error = true
            state.isLoading = false
        },
        signOut: (state) => {
            state.currentUser= null,
            state.isLoading= false,
            state.error= false 
        }
        }
    }
)

export const {loginStart, loginSuccess, loginError, signOut} = authSlice.actions;
export default authSlice.reducer;