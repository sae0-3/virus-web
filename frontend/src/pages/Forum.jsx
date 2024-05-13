import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArticleForum } from '../components/ArticleForum'
import '../styles/Forum.css'


export const Forum = () => {
  const [data, setData] = useState(null)
  const URL_API = 'http://localhost:8080/api/v1/topics'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(URL_API, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        setData(data)
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='container forum'>
      <nav className='forum-nav'>
        <div className='btn-group'>
          <button type='button' className='btn btn-secondary'>Opciones</button>
          <button type='button'
            className='btn btn-secondary dropdown-toggle dropdown-toggle-split'
            data-bs-toggle='dropdown'
            aria-expanded='false'
            data-bs-reference='parent'
          ></button>
          <ul className='dropdown-menu'>
            <li><a className='dropdown-item' data-bs-toggle='modal'
              data-bs-target='#searchModal'>Filtrar</a></li>
            <li><hr className='dropdown-divider' /></li>
            <li><a onClick={() => {}} className='dropdown-item'>Ordenar</a></li>
          </ul>
        </div>

        <Link to='/nuevo-tema' className='btn btn-secondary'
        ><i className='bi bi-plus'></i>Nuevo Tema</Link>


        <div id='searchModal'
          className='modal fade modalSearch'
          tabIndex='-1'
          aria-labelledby='searchModalLabel'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          aria-hidden='true'>
          <div className='modal-dialog modal-dialog-centered'>
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

                  <div className='form-check'>
                    <input className='form-check-input'
                      type='checkbox'
                      id='SearchFlexCheckDefault' />
                    <label className='form-check-label'
                      htmlFor='flexCheckDefault'
                    >Inactivos</label>
                  </div>
                </form>
              </section>
              <section className='modal-footer justify-content-between'>
                <button
                  type='button'
                  className='btn btn-outline-danger'
                  data-bs-dismiss='modal'
                >Cerrar</button>
                <button
                  type='button'
                  className='btn btn-outline-success'
                >Buscar</button>
              </section>
            </div>
          </div>
        </div>
      </nav>

      <section className='articles'>
        { data
          ? (
            <>
              {data.map(({ id, title, created_at, comments, views, active, author, participants }) => (
                <ArticleForum
                  key={id}
                  id={id}
                  title={title}
                  created_at={created_at}
                  comments={comments}
                  views={views}
                  active={active}
                  author={author}
                  participants={participants} />))}
            </>
          ) : (<p>Cargando...</p>)}
      </section>
    </div>
  )
}
