import { Routes, Route } from 'react-router-dom'
import SplashPage from './pages/splash/SplashPage'
import LoginPage from './pages/login/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
