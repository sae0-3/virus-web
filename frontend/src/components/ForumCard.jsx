import '../styles/ForumCard.css'
import profile_aux from '..//assets/user_.svg'


export const ForumCard = ({ id, title, participants, totalResponses,
                              totalViews, modifiedLatest, active }) => {

  const stateActive = active ? 'cardActive' : 'cardDeactivate'

  return (
    <article className={`forum-card-container ${stateActive}`}>
      <section className='f-c-c_title'>
        <a href={`/tema/${id}`}>
          <h3>{title}</h3>
        </a>
      </section>

      <section className='f-c-c_profiles'>
        {participants.slice(0, 7).map(({ id, username, profile }) => {
          if (profile == null)
            profile = profile_aux

          return (
            <img key={id} src={profile} alt={`${username} profile`} />
          )
        })}
      </section>

      <section className='f-c-c_data'>
        <p className='f-c-c_d_comments'>
          <span>Comentarios:</span> {totalResponses}
        </p>
        <p className='f-c-c_d_views'>
          <span>Vistas:</span> {totalViews}
        </p>
        <p className='f-c-c_d_modified'>
          <span>Ultima Modificación:</span> {modifiedLatest}
        </p>
      </section>
    </article>
  )
}
