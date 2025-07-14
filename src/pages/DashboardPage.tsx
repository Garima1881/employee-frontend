import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEmployees } from '../features/employee/employeeSlice';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import MyIcon from '../components/MyIcon';
import DeleteConfirmModal from '../components/DeletConfirmationModal';
import { useDeleteEmployee } from '../customHooks/useDeleteEmployee';

export default function DashboardPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { employees, loading, error } = useAppSelector((state) => state.employee);
    const [search, setSearch] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const {loading: deleteLoading , deleteEmployee} = useDeleteEmployee()
    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    const filtered = employees.filter((emp) => [emp.name, emp.email, emp.designation].some((field) => field.toLowerCase().includes(search.toLowerCase())))

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'designation', headerName: 'Designation', width: 200 },
        { field: 'salary', headerName: 'Salary', width: 150 },
        {
            field: 'actions', headerName: 'Actions', flex: 1,
            renderCell: (params) => (
                <div className='space-x-2'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm' onClick={() => navigate(`/employees/edit/${params.row.id}`)}>
                        <MyIcon iconName='Edit' fontSize='small' />
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm' onClick={() => {
                        setSelectedEmployeeId(params.row.id);
                        setOpenDeleteModal(true);
                    }}>
                        <MyIcon iconName='Delete' fontSize='small' />
                    </button>
                </div>
            )
        }
    ]


    const handleDelete = async () =>{
           if (!selectedEmployeeId) return;
         setOpenDeleteModal(false);
          try {
    await deleteEmployee(selectedEmployeeId);
    dispatch(fetchEmployees()); 
  } catch (err) {

  } finally {
    setOpenDeleteModal(false);
  }
    }
    return (

        <div className="max-w-7xl mx-auto p-4">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-semibold text-gray-800">Employee Dashboard</h2>
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow"
                    onClick={() => navigate('/employees/new')}
                >
                    + Add Employee
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>


            {error && <div className="text-red-600 font-medium mb-2">{error}</div>}
            {loading ? (
                <div className="text-center text-blue-500">Loading...</div>
            ) : (
                <div className="w-full bg-white rounded shadow-md">
                    <DataGrid
                        rows={filtered}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 },
                            },
                        }}
                        disableRowSelectionOnClick
                        getRowId={(row) => row.id}
                    />
             <DeleteConfirmModal
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  onConfirm={handleDelete}
/>

                </div>
            )}
        </div>
    );



}