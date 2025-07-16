import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../api/axios';

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async() =>{
    const res = await axios.get('/employees');
    console.log("==============================",res)
    return res.data
})



interface Employee {
    id : string,
    name : string,
    email: string,
    designation : string,
    salary : number
}

export interface EmployeeState {
    employees: Employee[],
    loading : boolean,
    error : string

}

const initialState : EmployeeState = {
    employees : [],
    loading : false,
    error: ''
}

const employeeSlice = createSlice({
    name :'employee',
    initialState ,
    reducers :{
        },
    extraReducers : (builder) =>{
        builder.addCase(fetchEmployees.pending, (state) =>{
            state.loading = true;
            state.error = ''
        })
        .addCase(fetchEmployees.fulfilled,(state,action) =>{
            console.log("=======================================", action.payload)
            state.loading = false;
            state.employees = action.payload
        })
        .addCase(fetchEmployees.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message ||'Failed to load employees'
        })
    },
    
})

export default employeeSlice.reducer