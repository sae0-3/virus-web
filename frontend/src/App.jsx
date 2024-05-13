import axios from 'axios'
import { Navigate, Outlet, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { NotMatch } from './pages/NotMatch'
import { Notice } from './pages/Notice'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Chat } from './pages/Chat'
import { Forum } from './pages/Forum'
import { ForumNewTopic } from './pages/ForumNewTopic'
import { ForumTopic } from './pages/ForumTopic'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


export const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      return
    }

    axios.post('http://localhost:8000/auth/verify', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => setUser(data))
    .catch((_) => setUser(null))
  }, [])

  return (
    <>
      <Header />

      <Routes>
        {/* <Route element={ <ProtectedRoute canActivate={user} /> }> */}
          <Route index element={<Forum />} />
          <Route path='temas' element={<Forum />} />
          <Route path='tema/:id' element={<ForumTopic />} />
          <Route path='nuevo-tema' element={<ForumNewTopic />} />

          <Route path='anuncios' element={<Notice />} />
          <Route path='chat' element={<Chat />} />
        {/* </Route> */}

        <Route path='iniciar-sesion' element={<Login />} />
        <Route path='registrarse' element={<Register />} />

        <Route path='*' element={<NotMatch />} />
      </Routes>
    </>
  )
}

const ProtectedRoute = ({canActivate, redirectPath = '/iniciar-sesion'}) =>
  !canActivate ? <Navigate to={redirectPath} replace /> : <Outlet />
