import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <Provider store={store}>
    <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>
  </AuthProvider>


)
