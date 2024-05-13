import { Link } from 'react-router-dom'
import '../styles/Login.css'


export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Se enviaron los valores')
  }

  return (
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
                required />
              <label htmlFor='input-login-username'>Username</label>
            </div>
          </div>

          <div className='form-floating'>
            <input type='password'
              className='form-control form-control-lg'
              id='input-login-password'
              placeholder=''
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
