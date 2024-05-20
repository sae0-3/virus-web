import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFetchPost } from '../hooks/useFetch'
import '../styles/Register.css'


const initialValues = {
  name: '',
  lastname: '',
  secondname: '',
  profile: '',
  username: '',
  password: '',
  mail: ''
}

export const Register = () => {
  const [redirect, setRedirect] = useState(false)
  const [formData, setFormData] = useState(initialValues)
  const { error, data, isLoading, fetchData } = useFetchPost('http://localhost:8000/auth/register')

  useEffect(() => {
    if (data && !error) {
      setRedirect(true)
    }
  }, [data])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(formData)
  }

  return redirect
    ? (
      <Navigate to='/iniciar-sesion' replace />
    ) : isLoading ? (
      <h3 className='text-center text-secondary'>Cargando...</h3>
    ) : (
      <div className='container register-container'>
        <div className='register-subcontainer text-center'>
          <h2>Registrarse</h2>

          <form className='form-floating' onSubmit={handleSubmit}>
            <div className='input-group'>
              <span className='input-group-text'>@</span>
              <input type='text'
                className='form-control form-control-lg'
                id='input-register-username'
                onChange={handleInputChange}
                name='username'
                value={formData.username}
                placeholder='Username'
                required />
            </div>

            <div className='col'>
              <input type='password'
                className='form-control form-control-lg'
                id='input-register-password'
                onChange={handleInputChange}
                name='password'
                value={formData.password}
                placeholder='Password'
                required />
            </div>

            <div className='input-group'>
              <input type='number'
                className='form-control form-control-lg'
                id='input-register-mail'
                onChange={handleInputChange}
                name='mail'
                value={formData.mail}
                placeholder='Codigo SIS'
                required />
              <span className='input-group-text'>@est.umss.edu</span>
            </div>

            <div className='col'>
              <input type='text'
                className='form-control form-control-lg'
                id='input-register-name'
                onChange={handleInputChange}
                name='name'
                value={formData.name}
                placeholder='Nombre'
                required />
            </div>

            <div className='row'>
              <div className='col'>
                <input type='text'
                  className='form-control form-control-lg'
                  id='input-register-lastname'
                  onChange={handleInputChange}
                  name='lastname'
                  value={formData.lastname}
                  placeholder='Apellido Paterno' />
              </div>
              <div className='col'>
                <input type='text'
                  className='form-control form-control-lg'
                  id='input-register-secondname'
                  onChange={handleInputChange}
                  name='secondname'
                  value={formData.secondname}
                  placeholder='Apellido Materno' />
              </div>
            </div>

            <div className="col">
            <input type='text'
                className='form-control form-control-lg'
                id='input-register-profile'
                onChange={handleInputChange}
                name='profile'
                value={formData.profile}
                placeholder='URL - Foto Perfil' />
            </div>

            <input className='btn btn-success' type='submit' />
          </form>

          {error && (
            <h3 className='text-center text-danger'>{ error.message }</h3>
          )}
        </div>
      </div>
    )
}
