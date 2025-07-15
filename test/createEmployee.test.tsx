import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEmployeePage from '../src/pages/CreateEmployeePage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  
import axios from '../src/api/axios';



jest.mock('react-router-dom', () => ({ useNavigate: jest.fn() }));
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: jest.fn() }));
// jest.mock('../src/api/axios', () => ({      
//   default: {
//     interceptors: {
//       request: {
//         use: jest.fn()
//       }
//     },
//     post: jest.fn()
//   }
// }));

jest.mock('../src/api/axios', () => {
  const post = jest.fn();
  return {
    __esModule: true,
    default: {
      interceptors: {
        request: {
          use: jest.fn()
        }
      },
      post
    }
  };
});

test('render create employee page',async()=> {
    ((useDispatch as unknown) as jest.Mock).mockReturnValue(jest.fn());
    ((useNavigate as unknown) as jest.Mock).mockReturnValue(jest.fn());
    render(<CreateEmployeePage/>);
    expect(await screen.findByText('name')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();   
    expect(screen.getByText('designation')).toBeInTheDocument();
    expect(screen.getByText('salary')).toBeInTheDocument();
    expect(screen.getByText('Create Employee')).toBeInTheDocument();
})


test('shows error when form is submitted with empty fields', async () => {
  (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  render(<CreateEmployeePage />);

  fireEvent.click(screen.getByText(/Submit/i));

  expect(await screen.findByText(/please fill all the fields/i)).toBeInTheDocument();
});

test('shows error when API call fails', async () => {
  const mockError = 'Failed to create the employee';
  (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  (axios.post as jest.Mock).mockRejectedValue({ response: { data: { message: mockError } } });

  render(<CreateEmployeePage />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jhon@doe.com' } });
    fireEvent.change(screen.getByLabelText(/designation/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/salary/i), { target: { value: '50000' } });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(await screen.findByText(mockError)).toBeInTheDocument();
});
