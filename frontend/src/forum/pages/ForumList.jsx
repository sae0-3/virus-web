import { useGet } from '@common/hooks'
import { ArticleForum } from '@forum/components'
import { Link } from 'react-router-dom'
import '@forum/styles/ForumList.css'


export const ForumList = () => {
  const [topics, error] = useGet('api/topics')

  return (
    <div className='container forum'>
      <nav className='forum-nav'>
        <Link to='/nuevo-tema' className='btn btn-secondary'
          ><i className='bi bi-plus'></i>Nuevo Tema</Link>
      </nav>

      <section className='articles'>
        {!!error ? (
          <h3 className='text-center text-danger'>{ error.message }</h3>
        ) : !!topics && topics.length === 0 ? (
          <h4 className='text-center text-secondary'>No hay elementos</h4>
        ) : !!topics && topics.map((topic) => (
            <ArticleForum
              key={topic.id}
              topic={topic}
            />
          )
        )}
      </section>
    </div>
  )
}
