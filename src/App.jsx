import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'
import SplashScreen from './views/SplashScreen'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from '@mui/material'
import MainTheme from './theme/MainTheme'

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={MainTheme}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/main' element={<Main />} />

            <Route path="/*" element={<SplashScreen />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
