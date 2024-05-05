import { Link } from 'react-router-dom'
import personIcon from '../../node_modules/bootstrap-icons/icons/person.svg'
import '../styles/ArticleForum.css'


export const ArticleForum = ({ id, title, create_at, comments, views }) => {

  return (
    <article className='card articleForum cardActive'>
      <div className='card-body'>
        <Link to={`/tema/${id}`}
          className='card-title h1'
        >{ title }</Link>

        <section className='articleForum-participants'>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
        </section>

        <section className='articleForum-data'>
          <p>{ comments }<span>Respuestas</span></p>
          <p>{ views }<span>Vistas</span></p>
          <p>{ create_at }<span>Actividad</span></p>
        </section>
      </div>
    </article>
  )
}
