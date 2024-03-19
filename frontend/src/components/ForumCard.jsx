import '../styles/ForumCard.css'


export const ForumCard = ({ title, participants, totalResponses, totalViews, modifiedLatest, active }) => {
  const stateActive = active ? 'cardActive' : 'cardDeactivate'

  return (
    <article className={'forum-card-container '+stateActive}>
      <section className='f-c-c_title'>
        <a href="#">
          <h3>{title}</h3>
        </a>
      </section>

      <section className='f-c-c_profiles'>
        {participants.slice(0, 10).map(({ id, name, profile }) =>
          <img key={id} src={profile} alt={name + ' profile'} />
        )}
      </section>

      <section className='f-c-c_data'>
        <p className='f-c-c_d_comments'><span>Comentarios:</span> {totalResponses}</p>
        <p className='f-c-c_d_views'><span>Vistas:</span> {totalViews}</p>
        <p className='f-c-c_d_modified'><span>Ultima Modificación:</span> {modifiedLatest}</p>
      </section>
    </article>
  )
}


ForumCard.defaultProps = {
  totalResponses: 0,
  totalViews: 0,
  modifiedLatest: '27/03/2024',
  active: true,
}
