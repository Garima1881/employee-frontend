import axios from '../api/axios'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../features/auth/authSlice";
import toast from 'react-hot-toast';

export default function RegisterPage (){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async(e : React.FormEvent) =>{
        e.preventDefault();
        setError('');
        if(!name || !password || !email){
            toast.error("Please fill all the details!!!")
            setError("Please Fill The Required Fields")
            return;
        }
       try{
        const response = await axios.post('/auth/register',{name,email,password})
        console.log("the register response is ", response)
        toast.success("Registered Successfully.")
        navigate('/login')

       }catch(error : any){
        console.log("=====",error)
        setError(`${error?.response?.data?.message}` || 'Registeration Failed')
       }
    }

    return(
     
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-12 rounded-lg shadow-md w-100">
                <h2 className="text-xl font-normal mb-5">  </h2>
                {error && <div className="text-red-500 mb-2">{error} </div>}
                  <input className="w-full border border-blue-200 px-3 py-2 mb-5"
                        placeholder="Name"
                        value = {name}
                       onChange={e => setName(e.target.value)}
                       required/>
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
                onClick={handleRegister}>
                    Register
                </button>
                <div className='text-gray-400'>Done with SignUp? <span className='text-blue-600 hover:text-sky-700 ' onClick={() =>navigate('/login')}> Click here to Login  !!!</span></div>
            </div>
        </div>

    )
}