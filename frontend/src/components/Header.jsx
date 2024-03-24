import '../styles/Header.css'


export const Header = () => {
  return (
    <>
      <header className='header-main'>
        <nav className='container'>
          <a href='#'
            className='navbar-brand flex-grow-1'
          >Sansi Web</a>
          <div>
            <button
              type='button'
              className='nav-link'
              data-bs-toggle='modal'
              data-bs-target='#searchModal'
            ><i className='bi-search'></i></button>
            <button
              type='button'
              className='nav-link'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasHeader'
              aria-controls='offcanvasHeader'
            ><i className='bi-list'></i></button>
          </div>
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
              <a href='#'
                className='link-body-emphasis
                            link-offset-2
                            link-underline-opacity-25
                            link-underline-opacity-75-hover'
              >Foro</a></li>
            <li className='list-group-item'>
              <a href='#'
                className='link-body-emphasis
                              link-offset-2
                              link-underline-opacity-25
                              link-underline-opacity-75-hover'
              >Anuncios</a></li>
            <li className='list-group-item'>
              <a href='#'
                className='link-body-emphasis
                              link-offset-2
                              link-underline-opacity-25
                              link-underline-opacity-75-hover'
              >Chats</a></li>
          </ul>
        </section>
        <section className='offcanvas-footer'>
          <div>
            <a href='#' className='btn btn-outline-primary'>Iniciar Sesión</a>
            <a href='#' className='btn btn-outline-warning'>Registrarse</a>
          </div>
        </section>
      </div>

      <div
        className='modal fade modalSearch'
        id='searchModal'
        tabIndex='-1'
        aria-labelledby='searchModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <section className='modal-header'>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </section>
            <section className='modal-body'>
              <form>
                <div className='row'>
                  <div className='col-8'>
                    <input
                      type='text'
                      className='form-control'
                      id='recipient-name' />
                  </div>
                  <div className='col-4'>
                    <select className='form-select'>
                      <option value='1'>Usuario</option>
                      <option value='2'>Categoria</option>
                      <option value='3'>Tema/Anuncio</option>
                    </select>
                  </div>
                </div>
              </form>
            </section>
            <section className='modal-footer justify-content-between'>
              <button
                type='button'
                className='btn btn-outline-danger'
                data-bs-dismiss="modal"
              >Cerrar</button>
              <button
                type='button'
                className='btn btn-outline-success'
              >Buscar</button>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
