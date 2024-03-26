import { useState } from 'react'
import { ArticleForum } from '../components/ArticleForum'
import '../styles/Forum.css'


export const Forum = () => {
  const [ orderReplys, setOrderReplys ] = useState('down');
  const [ orderViews, setOrderViews ] = useState('down');
  const [ orderModified, setOrderModified ] = useState('down');

  const handleBtn = (tmp, funcOrder) => {
    const value = (tmp == 'down') ? 'up' : 'down'
    funcOrder(value)
  }

  return (
    <div className='container forum'>
      <nav className='forum-nav'>
        <a href='#'
          className='btn btn-secondary'
          id='forum-nav-addTopic'
        ><i className='bi bi-plus'></i>Nuevo Tema</a>
      </nav>

      <section className='forum-last-nav'>
        <h4 className='forum-last-nav_title'>Tema</h4>
        <div className='forum-last-nav_data btn-group'>
          <button
            type='button'
            className='btn'
            onClick={() => { handleBtn(orderReplys, setOrderReplys) }}
          >Respuestas <i className={`bi bi-chevron-double-${orderReplys}`}></i>
          </button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleBtn(orderViews, setOrderViews) }}
          >Vistas <i className={`bi bi-chevron-double-${orderViews}`}></i>
          </button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleBtn(orderModified, setOrderModified) }}
          >Actividad <i className={`bi bi-chevron-double-${orderModified}`}></i>
          </button>
        </div>
      </section>

      <section className='articles'>
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
        <ArticleForum />
      </section>
    </div>
  )
}
