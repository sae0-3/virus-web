import { useUser } from '@auth/hooks'
import { CardTopic } from '@forum/components'
import '@forum/styles/TopicInformation.css'


export const TopicInformation = ({ topic, callback }) => {
  const [{ id: user_id }] = useUser()
  const { author, active, categories, comments, title, views } = topic
  const isOwner = author.id===user_id

  return (
    <div className='container'>
      <div className='cardTopicForum'>
        <h2 className='cardTopicForum-title'>{title}</h2>
        <CardTopic content={topic} isOwner={isOwner} />

        <section className='cardTopicForum-footer'>
          <div className='cardTopicForum-footer_gear'>
            <span className={`badge rounded-pill text-bg-${
              active ? 'success' : 'danger'}`}
            >{active ? 'Abierto' : 'Cerrado'}</span>
            {isOwner &&
              <button className='btn' onClick={() => {callback(true)}}>
                <i className='bi bi-gear-fill text-secondary'></i>
              </button>
            }
          </div>

          <div className='cardTopicForum-footer_data'>
            <p>{comments.length}<span>Respuestas</span></p>
            <p>{views}<span>Vistas</span></p>
          </div>
          <button
            className='btn btn-secondary'
            data-bs-target='#collapseTopicCategories'
            data-bs-toggle='collapse'
            aria-expanded='false'
            aria-controls='collapseTopicCategories'
          >Categorias</button>
        </section>

        <section className='collapse' id='collapseTopicCategories'>
          <div>
            {categories.map((name, idx) => (
              <p key={`${idx}-${name}`}>
                <span className='badge text-bg-primary'>{name}</span>
              </p>
            ))}
          </div>
        </section>
      </div>

      <hr />

      {comments.map(({ comentator, commented_at, content, id }) => {
        const data = {
          author: comentator,
          created_at: commented_at,
          description: content,
          id,
        }

        return (
          <CardTopic key={id} content={data} isOwner={comentator.id===user_id} />
        )
      })}
    </div>
  )
}
