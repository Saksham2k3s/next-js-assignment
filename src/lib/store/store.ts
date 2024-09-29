import { configureStore } from '@reduxjs/toolkit';
import modeReducer from '../store/features/mode/modeSlice'
import productSlice from './features/products/productSlice';
// store variable is a global variable.
export const makeStore = () => {
    return configureStore({
        reducer: {
            mode: modeReducer,
            product: productSlice
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
