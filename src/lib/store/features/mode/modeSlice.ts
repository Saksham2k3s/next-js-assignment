import { createSlice } from "@reduxjs/toolkit";


export interface ModeSlice{
     mode: string
}

const initialState : ModeSlice = {
     mode: 'dark'
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState: initialState,
    reducers: {
        updateMode : (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark'
        }
    }
})

export const { updateMode } = modeSlice.actions;
export default modeSlice.reducer