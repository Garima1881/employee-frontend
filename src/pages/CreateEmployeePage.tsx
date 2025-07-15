import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import axios from '../api/axios';
import toast from "react-hot-toast";

export default function CreateEmployeePage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        designation: '',
        salary: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('')
        const { name, email, designation, salary } = form;
        if (!name || !email || !designation || !salary) {
            setError('Please fill all the fields')
            return;
        }
        try {
            console.log("----here ")
            await axios.post('/employees', {
                ...form,
                salary: parseFloat(form.salary)
            })
            toast("Employee Created !!!")
            navigate('/dashboard')
        }
        catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to create the employee')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Create Employee
            </h2>

            {error && (
                <div className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded border border-red-200">
                    {error}
                </div>
            )}

            {['name', 'email', 'designation', 'salary'].map((field) => (
                <div key={field} className="mb-5">
                    <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-700 capitalize mb-1"
                    >
                        {field}
                    </label>
                    <input
                        id={field}
                        name={field}
                        type={'text'}
                        placeholder={`Enter ${field}`}
                        value={(form as any)[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
            >
                Submit
            </button>
        </div>

    )
}