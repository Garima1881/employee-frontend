import {configureStore} from '@reduxjs/toolkit'
import authReducer,{type AuthState} from '../features/auth/authSlice'
import employeeReducer,{type EmployeeState} from '../features/employee/employeeSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        employee : employeeReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { AuthState, EmployeeState }