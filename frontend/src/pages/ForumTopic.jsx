import { CardTopic } from '../components/CardTopic'
import { useState, useEffect } from 'react'
import '../styles/ForumTopic.css'


export const ForumTopic = () => {
  const [data, setData] = useState(null)
  const URL_API = 'http://localhost:8080/api/v1/topics'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idx = location.pathname.split('/').pop()
        const response = await fetch(`${URL_API}/${idx}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
    {data && (
      <div className='container'>
        <div className='cardTopicForum'>
          <h2 className='cardTopicForum-title'>{ data.title }</h2>
          <CardTopic content={data.description}
                    username={data.author.username}
                    profile={data.author.profile}
                    date={data.created_at}
                    user_id={data.author.id} />

          <div className='cardTopicForum-footer'>
            <span className={`badge rounded-pill text-bg-${data.active ? 'success' : 'danger'}`}>
              { data.active ? 'Abierto' : 'Cerrado' }</span>
            <div className='cardTopicForum-footer_data'>
              <p>{ data.comments.length }<span>Respuestas</span></p>
              <p>{ data.views }<span>Vistas</span></p>
            </div>
            <button
              className='btn btn-secondary'
              data-bs-target='#collapseTopicCategories'
              data-bs-toggle='collapse'
              aria-expanded='false'
              aria-controls='collapseTopicCategories'
            >Categorias</button>
          </div>

          <div className='collapse' id='collapseTopicCategories'>
            <div>
              {data.categories.map((item, i) => (
                <p key={i}><span className='badge text-bg-primary'>{ item }</span></p>
              ))}
            </div>
          </div>
        </div>

        <hr />

        {data.comments.map(({id, content, user: { user_id, username, profile }, commented_at}) => (
          <CardTopic key={id}
            content={content}
            username={username}
            profile={profile}
            date={commented_at}
            user_id={user_id}
          />
        ))}
      </div>
    )}
    { !data && <p>Cargando...</p> }
    </>
  )
}
