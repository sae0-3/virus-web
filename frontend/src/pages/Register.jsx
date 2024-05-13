import '../styles/Register.css'


export const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creando nuevo usuario')
  }

  return (
    <div className='container register-container'>
      <div className='register-subcontainer text-center'>
        <h2>Registrarse</h2>

        <form className='form-floating' onSubmit={handleSubmit}>
          <div className='input-group'>
            <span className='input-group-text'>@</span>
            <input type='text'
              className='form-control form-control-lg'
              id='input-register-username'
              placeholder='Username'
              required />
          </div>

          <div className='col'>
            <input type='password'
              className='form-control form-control-lg'
              id='input-register-password'
              placeholder='Password'
              required />
          </div>

          <div className='input-group'>
            <input type='number'
              className='form-control form-control-lg'
              id='input-register-mail'
              placeholder='Codigo SIS'
              required />
            <span className='input-group-text'>@est.umss.edu</span>
          </div>

          <div className='col'>
            <input type='text'
              className='form-control form-control-lg'
              id='input-register-name'
              placeholder='Nombre'
              required />
          </div>

          <div className='row'>
            <div className='col'>
              <input type='text'
                className='form-control form-control-lg'
                id='input-register-lastname'
                placeholder='Apellido Paterno' />
            </div>
            <div className='col'>
              <input type='text'
                className='form-control form-control-lg'
                id='input-register-secondname'
                placeholder='Apellido Materno' />
            </div>
          </div>

          <div className="col">
          <input type='text'
              className='form-control form-control-lg'
              id='input-register-profile'
              placeholder='URL - Foto Perfil' />
          </div>

          <input className='btn btn-success'  type='submit' />
        </form>
      </div>
    </div>
  )
}
