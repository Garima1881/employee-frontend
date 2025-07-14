import {Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ToastContainer from './components/Toaster'
import CreateEmployeePage from './pages/CreateEmployeePage'
import Layout from './components/Layout'
import EditEmployeeForm from './pages/EditEmployeeForm'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './context/ProtectedRoute'
function App() {


  return (
    <>
    <ToastContainer/>
    <Routes>
    <Route path='/' element ={<LoginPage/>}></Route>
    <Route path='/login' element ={<LoginPage/>}></Route>
     <Route path='/register' element ={<RegisterPage/>}></Route>
    <Route element = {<Layout/>}>
      <Route path='/employees/new' element ={   <ProtectedRoute>
          <CreateEmployeePage />
        </ProtectedRoute>}></Route>
      <Route path='/employees/edit/:id' element ={<ProtectedRoute>
          <EditEmployeeForm />
        </ProtectedRoute>}></Route>
      <Route path='/dashboard' element = {<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>}></Route>
    </Route>
  
  </Routes>
    </>
  
  )
}

export default App
