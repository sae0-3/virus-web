import { Link } from 'react-router-dom'
import './styles/ArticleForum.css'


export const ArticleForum = ({ id, title, created_at, comments, views, active, author, participants }) => {
  return (
    <article className={`card articleForum ${active ? 'cardActive' : 'cardDeactive'}`}>
      <div className='card-body'>
        <Link to={`/tema/${id}`}
          className='card-title h1'
        >{ title }</Link>

        <section className='articleForum-participants'>
          <Link to={`/usuario/${author.id}`}>
            <img src={author.profile} alt={`${author.name.toLowerCase()} profile`} /></Link>

          { participants.slice(0,4).map(({ id, name, profile }) => (
            <Link to={`/usuario/${id}`} key={id}>
              <img src={profile} alt={`${name.toLowerCase()} profile`} /></Link>
          )) }
        </section>

        <section className='articleForum-data'>
          <p>{ comments }<span>Respuestas</span></p>
          <p>{ views }<span>Vistas</span></p>
          <p>{ created_at }<span>Actividad</span></p>
        </section>
      </div>
    </article>
  )
}
