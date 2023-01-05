import { createSlice } from "@reduxjs/toolkit";


const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {
        language: 'en-US'
    },
    reducers: {
        setLanguage: (state, action) => {
            console.log(action.payload)
            state.language = action.payload.language
          }
        }            
})

export const {setLanguage} = preferencesSlice.actions;
export default preferencesSlice.reducer;