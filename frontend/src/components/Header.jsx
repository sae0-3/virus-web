import { Link } from 'react-router-dom'
import '../styles/Header.css'


export const Header = () => {
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

      <div
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
                className='link-body-emphasis
                            link-offset-2
                            link-underline-opacity-25
                            link-underline-opacity-75-hover'
              >Foro</Link></li>
            <li className='list-group-item'>
              <Link to='/anuncios'
                className='link-body-emphasis
                              link-offset-2
                              link-underline-opacity-25
                              link-underline-opacity-75-hover'
              >Anuncios</Link></li>
            <li className='list-group-item'>
              <Link to='/chat'
                className='link-body-emphasis
                              link-offset-2
                              link-underline-opacity-25
                              link-underline-opacity-75-hover'
              >Chats</Link></li>
          </ul>
        </section>
        <section className='offcanvas-footer'>
          <div>
            <Link to='/iniciar-sesion' className='btn btn-outline-primary'>Iniciar Sesión</Link>
            <Link to='/registrarse' className='btn btn-outline-warning'>Registrarse</Link>
          </div>
        </section>
      </div>
    </>
  )
}
