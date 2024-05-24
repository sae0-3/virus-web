import { CardTopic } from '@forum/components'
import '@forum/styles/TopicInformation.css'


export const TopicInformation = ({ topic, isOwner }) => {
  return (
    <div className='container'>
      <div className='cardTopicForum'>
        <h2 className='cardTopicForum-title'>{topic.title}</h2>
        <CardTopic content={topic} isOwner={isOwner} />

        <section className='cardTopicForum-footer'>
          <span className={`badge rounded-pill text-bg-${
            topic.active ? 'success' : 'danger'}`}
          >{topic.active ? 'Abierto' : 'Cerrado'}</span>
          <div className='cardTopicForum-footer_data'>
            <p>{topic.comments.length}<span>Respuestas</span></p>
            <p>{topic.views}<span>Vistas</span></p>
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
            {topic.categories.map((item, i) => (
              <p key={i}>
                <span className='badge text-bg-primary'>{item}</span>
              </p>
            ))}
          </div>
        </section>
      </div>

      <hr />

      {topic.comments.map((comment) => (
        <CardTopic key={comment.id} content={comment} />
      ))}
    </div>
  )
}
