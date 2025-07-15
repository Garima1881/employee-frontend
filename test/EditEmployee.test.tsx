import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditEmployeeForm from '../src/pages/EditEmployeeForm';
import axios from '../src/api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../src/api/axios');
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('EditEmployeeForm', () => {

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    jest.clearAllMocks();
  });

  test('shows loading initially and then renders employee data', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { name: 'Alice', email: 'alice@example.com', designation: 'Manager', salary: '70000' } }), 10)
  )
);

    render(<EditEmployeeForm />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
      expect(screen.getByDisplayValue('alice@example.com')).toBeInTheDocument();
    });
  });

  test('allows user to change input fields', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        name: '',
        email: '',
        designation: '',
        salary: '',
      },
    });

    render(<EditEmployeeForm />);

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: 'Bob' } });
      expect(nameInput).toHaveValue('Bob');
    });
  });

 test('submits updated employee data successfully', async () => {
  const mockNavigate = jest.fn(); 
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      designation: 'Manager',
      salary: '70000',
    },
  });
  (axios.put as jest.Mock).mockResolvedValue({});

  render(<EditEmployeeForm />);

  await waitFor(() => {
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(axios.put).toHaveBeenCalledWith('/employees/123', {
      name: 'Alice',
      email: 'alice@example.com',
      designation: 'Manager',
      salary: 70000,
    });
    expect(toast.success).toHaveBeenCalledWith('Employee Data Updated !!!');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});


});