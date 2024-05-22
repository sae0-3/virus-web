import { useGet } from '@common/hooks'
import { ArticleForum } from '@forum/components'
import { Link } from 'react-router-dom'
import './styles/ForumList.css'


export const ForumList = () => {
  const [data, error, isLoading] = useGet('http://localhost:8080/api/v1/topics',
    { Authorization: `Bearer ${ localStorage.getItem('token') }` })

  return (
    <div className='container forum'>
      <nav className='forum-nav'>
        <Link to='/nuevo-tema' className='btn btn-secondary'
          ><i className='bi bi-plus'></i>Nuevo Tema</Link>
      </nav>

      <section className='articles'>
        {isLoading ? (
          <div className='alert alert-info text-center'>Cargando...</div>
        ) : error ? (
          <h3 className='text-center'>{ error.message }</h3>
        ) : !!data && data.length === 0 ? (
          <h4 className='text-center text-secondary'>No hay elementos</h4>
        ) : !!data && data.map(({ id, title, created_at, comments, views,
            active, author, participants }) => (
            <ArticleForum
              key={id}
              id={id}
              title={title}
              created_at={created_at}
              comments={comments}
              views={views}
              active={active}
              author={author}
              participants={participants}
            />
          )
        )}
      </section>
    </div>
  )
}
