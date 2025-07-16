import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    token: string | null,
    username?: string,
}

const  initialState: AuthState ={
    token : localStorage.getItem('token'),
    username: undefined,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        setToken: (state, action: PayloadAction<string>) =>{
            state.token  = action.payload;
            localStorage.setItem('token', action.payload)
        },
           setUserName: (state, action: PayloadAction<string>) =>{
            state.username  = action.payload;
            localStorage.setItem('username', action.payload)
        },
        logout:(state) =>{
            state.token = null;
            state.username = undefined;   
             localStorage.removeItem('username')
            localStorage.removeItem('token')
        }
    }
})

export const {setToken, setUserName,logout} = authSlice.actions

export default authSlice.reducer;
