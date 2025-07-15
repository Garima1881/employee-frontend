import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashboardPage from './DashboardPage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
jest.mock('react-router-dom', () => ({ useNavigate: jest.fn() }))
jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: jest.fn() }))
jest.mock('../api/axios', () => ({
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


test('shows the title and search bar', () => {

  ((useSelector as unknown) as jest.Mock).mockImplementation(fn =>
    fn({ employee: { employees: [], loading: false, error: '' } })
  );
  ((useDispatch as unknown) as jest.Mock).mockReturnValue(jest.fn);
  render(<DashboardPage />);
  expect(screen.getByText(/Employee Dashboard/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search by/)).toBeInTheDocument();
});

test('clicking Add button navigates to create page', () => {
  ((useSelector as unknown) as jest.Mock).mockImplementation(fn =>
    fn({ employee: { employees: [], loading: false, error: '' } })
  );

  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  render(<DashboardPage />);

  const addBtn = screen.getByRole('button', { name: /\+ Add Employee/ });
  fireEvent.click(addBtn);

  expect(mockNavigate).toHaveBeenCalledWith('/employees/new');
});


test('show employee in table', () => {
  ((useSelector as unknown) as jest.Mock).mockImplementation(fn =>
    fn({
      employee: {
        employees: [
          { id: '1', name: 'Alice', email: 'alice@example.com', designation: 'Dev', salary: 1000 },
        ],
        loading: false,
        error: '',
      }
    })
  );

  render(<DashboardPage />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
});


