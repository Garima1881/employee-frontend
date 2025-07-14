import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store.js';
import { logout } from '../features/auth/authSlice';
import { useRef, useState } from 'react';
import MyIcon from './MyIcon.js';
import useClickOutside from '../customHooks/useClickOutside.js';
import { useAuth } from '../context/AuthContext.js';

const Header = ({ userName = 'John Doe' }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const {logout} = useAuth()
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setDropdownOpen(false));
    const drawerRef = useRef<HTMLDivElement>(null);
    useClickOutside(drawerRef, () => setDrawerOpen(false));
    const handleLogout = () => {
        logout()
        navigate('/login');

    }

    return (<>   <header className='bg-blue-700 text-white flex justify-between items-center fixed top-0 left-0 right-0 h-16 px-5'>

        <div className='cursor-pointer' onClick={() => setDrawerOpen(true)}>
            <MyIcon iconName="Menu" />
        </div>
        <div className='relative'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setDropdownOpen(!isDropdownOpen)}>
                <span>{userName}</span>
                <MyIcon iconName='AccountCircle' fontSize='large' />
            </div>
            {
                isDropdownOpen && (
                    <div ref={dropdownRef} className='right-0 mt-2 w-32 absolute bg-white text-black rounded shadow-md'>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                setDropdownOpen(false);
                                handleLogout()
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )
            }
        </div>
    </header>

        <div
            ref={drawerRef}
            className={`fixed top-16 left-0 w-64 h-full bg-blue-950 text-white p-4 transition-transform z-40 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <ul className="space-y-4">
                <li className="hover:text-gray-300 cursor-pointer " onClick={() => navigate('/dashboard')}>Home</li>
                <li className="hover:text-gray-300 cursor-pointer" onClick={() => navigate('/employees/new')}>Create Employees</li>
                <li className="hover:text-gray-300 cursor-pointer" onClick={() => navigate('/dashboard')}>About</li>
            </ul>
        </div>
    </>



    )

}

export default Header