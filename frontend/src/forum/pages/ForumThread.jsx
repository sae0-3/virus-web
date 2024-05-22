import { useGet } from '@common/hooks'
import { NotMatch } from '@common/pages'
import { CardTopic } from '@forum/components'
import './styles/ForumThread.css'


export const ForumThread = () => {
  const [data, error, isLoading] = useGet(
    `http://localhost:8080/api/v1/topics/${location.pathname.split('/').pop()}`,
    { Authorization: `Bearer ${localStorage.getItem('token')}` }
  )

  const { title,
    description,
    created_at,
    author,
    active,
    comments,
    views,
    categories } = !!data && data

  return isLoading ? (
    <div className='alert alert-info text-center'>Cargando...</div>
  ) : error ? (
    <NotMatch />
  ) : (!!data &&
    <div className='container'>
      <div className='cardTopicForum'>
        <h2 className='cardTopicForum-title'>{ title }</h2>
        <CardTopic content={description}
                  username={author.username}
                  profile={author.profile}
                  date={created_at}
                  user_id={author.id} />

        <section className='cardTopicForum-footer'>
          <span className={`badge rounded-pill text-bg-${active ? 'success' : 'danger'}`}>
            { active ? 'Abierto' : 'Cerrado' }</span>
          <div className='cardTopicForum-footer_data'>
            <p>{ comments.length }<span>Respuestas</span></p>
            <p>{ views }<span>Vistas</span></p>
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
            {categories.map((item, i) => (
              <p key={i}>
                <span className='badge text-bg-primary'>{ item }</span>
              </p>
            ))}
          </div>
        </section>
      </div>

      <hr />

      {comments.map(({id, content, user, commented_at}) => (
        <CardTopic key={id}
        content={content}
        username={user.username}
        profile={user.profile}
        date={commented_at}
        user_id={user.user_id}
        />
      ))}
    </div>
  )
}
