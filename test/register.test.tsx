import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterPage from '../src/pages/RegisterPage';
import axios from '../src/api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';


jest.mock('axios');
jest.mock('react-router-dom',()=>({useNavigate: jest.fn()}))
jest.mock('react-redux', () =>({useDispatch: jest.fn()}))
jest.mock('../src/context/AuthContext',()=>({useAuth:jest.fn()}))
jest.mock('../src/api/axios', () => ({
  default: {
    interceptors: {
      request: {
        use: jest.fn()
      }
    },
    post: jest.fn(),
    get: jest.fn()
  }
}));
import { useDispatch } from 'react-redux';

test('render Register page',()=>{

const mockedUseDispatch = useDispatch as unknown as jest.Mock;
  mockedUseDispatch.mockReturnValue(jest.fn());
  (useAuth as jest.Mock).mockReturnValue(jest.fn());
  (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(<RegisterPage/>);

expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
expect(screen.queryByPlaceholderText('password')).toBeInTheDocument();
expect(screen.queryByPlaceholderText('Name')).toBeInTheDocument();
expect(screen.queryByText('Register')).toBeInTheDocument();
 

})