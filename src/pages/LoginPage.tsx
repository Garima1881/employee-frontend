import axios from '../api/axios'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../features/auth/authSlice";
import { useAuth } from '../context/AuthContext';

export default function LoginPage (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {login} = useAuth()
    const handleLogin = async(e : React.FormEvent) =>{
        e.preventDefault();
        setError('');
       try{
        const response = await axios.post('/auth/login',{email,password})
        const {token} = response.data;
        dispatch(setToken(token));
        login(token)
        navigate('/dashboard')

       }catch(error : any){
        setError(`${error?.response?.data?.message}` || 'Login Failed')
       }
    }

    return(
     
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-12 rounded-lg shadow-md w-100">
                <h2 className="text-xl font-normal mb-5"> Welcome to EMS !!!</h2>
                {error && <div className="text-red-500 mb-2">{error} </div>}
                <input className="w-full border border-blue-200 px-3 py-2 mb-5"
                        placeholder="Email"
                        value = {email}
                       onChange={e => setEmail(e.target.value)}
                       required/>
                <input className="w-full border border-blue-200  px-3 py-2 mb-5" 
                placeholder= "password"
                       type='password'
                       value={password}
                       onChange={e =>setPassword(e.target.value)}
                       required/>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-5"
                onClick={handleLogin}>
                    Login
                </button>
                <div className='text-gray-400'>Don't have an account? <span className='text-blue-600 hover:text-sky-700 ' onClick={() =>navigate('/register')}> Register Now !!!</span></div>
            </div>
        </div>

    )
}