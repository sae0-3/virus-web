import { Loading } from '@common/components'
import { useForm, usePost } from '@common/hooks'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './styles/Login.css'


const initialValues = {
  username: '',
  password: ''
}

export const Login = () => {
  const [redirect, setRedirect] = useState(false)
  const [formData, handleInputChage] = useForm(initialValues)
  const [fetchData, data, , isLoading] = usePost('http://localhost:8000/auth/login')

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token)
      setRedirect(true)
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(formData)
  }

  return redirect ? (
    <Navigate to='/' replace />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className='container login-container'>
      <div className='login-subcontainer text-center'>
        <h2>Iniciar Sesión</h2>

        <form className='form-floating' onSubmit={handleSubmit}>
          <div className='input-group'>
            <span className='input-group-text'>@</span>
            <div className='form-floating'>
              <input type='text'
                className='form-control form-control-lg'
                id='input-login-username'
                placeholder=''
                name='username'
                onChange={handleInputChage}
                value={formData.username}
                required />
              <label htmlFor='input-login-username'>Username</label>
            </div>
          </div>

          <div className='form-floating'>
            <input type='password'
              className='form-control form-control-lg'
              id='input-login-password'
              placeholder=''
              name='password'
              onChange={handleInputChage}
              value={formData.password}
              required />
            <label htmlFor='input-login-password'>Password</label>
          </div>

          <div className='login-btns'>
            <Link to='/registrarse' className='btn btn-danger' type='submit'>
              Registrarse</Link>
            <input className='btn btn-success' type='submit'/>
          </div>
        </form>
      </div>
    </div>
  )
}
