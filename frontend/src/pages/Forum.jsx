import { useState, useEffect } from 'react'
import { ForumCard } from '../components/ForumCard'
import '../styles/Forum.css'


export const Forum = () => {
  const [data, setData] = useState(null);
  const [orderComments, setOrderComments] = useState('down')
  const [orderViews, setOrderViews] = useState('down')
  const [orderModified, setOrderModified] = useState('down')

  const handleOrderComment = () => {
    const tmp = (orderComments == 'down') ? 'up' : 'down';
    setOrderComments(tmp)
  }

  const handleOrderViews = () => {
    const tmp = (orderViews == 'down') ? 'up' : 'down';
    setOrderViews(tmp)
  }

  const handleOrderModified = () => {
    const tmp = (orderModified == 'down') ? 'up' : 'down';
    setOrderModified(tmp)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/temas_card')

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData();
  }, [])

  return (
    <section style={{ width: '100%' }}>
      <div className='forum-container container'>
        <section className='forum-info'>
          <section className='forum-info_tema'>
            <h3>Tema</h3>
          </section>
          <section className='forum-info_space'></section>
          <section className='forum-info_data'>
            <h4 className='forum-info_data_1'>
              Respuestas
              <i className={`bi bi-chevron-double-${orderComments}`}
                onClick={handleOrderComment}>
              </i>
            </h4>
            <h4 className='forum-info_data_2'>
              Vistas
              <i className={`bi bi-chevron-double-${orderViews}`}
                onClick={handleOrderViews}>
              </i>
            </h4>
            <h4 className='forum-info_data_3'>
              Ultima Modificaión
              <i className={`bi bi-chevron-double-${orderModified}`}
                onClick={handleOrderModified}>
              </i>
            </h4>
          </section>
        </section>

        {data && data.map(({ id, comments, views, last_modification,
          participants, status, title }) =>
            <ForumCard
              key={id}
              id={id}
              title={title}
              participants={participants}
              totalResponses={comments}
              totalViews={views}
              modifiedLatest={last_modification}
              active={status}
            />
        )}
      </div>
    </section>
  )
}
