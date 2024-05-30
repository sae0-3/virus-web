import { useUser } from '@auth/hooks'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/Header.css'


export const Header = () => {
  const [{ id, isAuthenticated }, setUser] = useUser()
  const offcanvas = useRef()

  const handleClick = () => {
    // PROVOCA RECARGA DE COMPONENTES
    // const bsOffcanvas = new bootstrap(offcanvas.current)
    // bsOffcanvas.hide()
  }

  return (
    <>
      <header className='header-main'>
        <nav className='container'>
          <Link to='/'
            className='navbar-brand flex-grow-1'
          >Sansi Web</Link>
          <button
            type='button'
            className='nav-link'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasHeader'
            aria-controls='offcanvasHeader'
          ><i className='bi-list'></i></button>
        </nav>
      </header>

      <div ref={offcanvas}
        className='offcanvas offcanvas-start offcanvasHeader'
        data-bs-scroll='true'
        tabIndex='-1'
        id='offcanvasHeader'
        aria-labelledby='offcanvasLabel'>
        <section className='offcanvas-header'>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </section>
        <section className='offcanvas-body'>
          <ul className='list-group list-group-flush justify-content-center'>
            <li className='list-group-item'>
              <Link to='/'
                onClick={handleClick}
                className='link-body-emphasis
                            link-offset-2
                            link-underline-opacity-25
                            link-underline-opacity-75-hover'
              >Foro</Link></li>
            <li className='list-group-item'>
              <Link to='/anuncios'
                onClick={handleClick}
                className='link-body-emphasis
                              link-offset-2
                              link-underline-opacity-25
                              link-underline-opacity-75-hover'
              >Anuncios</Link></li>
            <li className='list-group-item'>
              <Link to='/chat'
                onClick={handleClick}
                className='link-body-emphasis
                              link-offset-2
                              link-underline-opacity-25
                              link-underline-opacity-75-hover'
              >Chats</Link></li>
          </ul>
        </section>
        <section className='offcanvas-footer'>
          <div>
            <Link to={isAuthenticated ? `/usuario/${id}` : '/iniciar-sesion'}
              onClick={handleClick}
              className='btn btn-outline-primary'
            >{isAuthenticated ? 'Ver Perfil' : 'Iniciar Sesión'}</Link>
            <Link to={isAuthenticated ? '/iniciar-sesion' : '/registrarse'}
              onClick={() => {
                if (isAuthenticated) {
                  localStorage.removeItem('token')
                  setUser({ isAuthenticated: false })
                }
                handleClick()
              }}
              className='btn btn-outline-warning'
            >{isAuthenticated ? 'Cerrar Sesión' : 'Registrarse'}</Link>
          </div>
        </section>
      </div>
    </>
  )
}
