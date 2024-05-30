import { Link } from 'react-router-dom'
import userIcon from '@common/assets/user.png'
import '@forum/styles/ArticleForum.css'


export const ArticleForum = ({ topic }) => {
  const { id, title, created_at, comments, views, active, author, participants } = topic
  if (!author.profile) { author.profile = userIcon }

  return (
    <article className={`card articleForum ${active ? 'cardActive' : 'cardDeactive'}`}>
      <div className='card-body'>
        <Link to={`/tema/${id}`}
          className='card-title h1'
        >{ title }</Link>

        <section className='articleForum-participants'>
          <Link to={`/usuario/${author.id}`}>
            <img src={author.profile} alt={`${author.username.toLowerCase()} profile`} />
          </Link>

          {participants.slice(0, 4).map(({ id, username, profile }, idx) => {
            if (!profile) { profile = userIcon }

            return (
              <Link to={`/usuario/${id}`} key={`${id}-${idx}`}>
                <img src={profile} alt={`${username.toLowerCase()} profile`} />
              </Link>
            )
          })}
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
