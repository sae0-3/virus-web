import { usePost } from '@common/hooks'
import MDEditor, { commands } from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '@forum/styles/ForumPost.css'


export const ForumPost = () => {
  const [data, setData] = useState('')
  const navigate = useNavigate()
  const [fetchData, response, error] = usePost(
    'http://localhost:8080/api/v1/topics/create')

  useEffect(() => {
    if (!!response && !error) {
      navigate(`/tema/${response.id}`)
    }
  }, [response])

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = document.getElementById('titleTopicForumLabel').value

    fetchData(
      { title, data }, 
      { Authorization: `Bearer ${localStorage.getItem('token')}`}
    )
  }

  return (
    <div className='container forumNewTopic'>
      <h3 className='forumNewTopic-title'>Nuevo Tema</h3>

      {error && <p className='text-center text-danger'>Error: {error.message}</p>}

      <form className='addTopic' onSubmit={handleSubmit}>
        <input
          autoComplete='off'
          type='text'
          className='form-control'
          id='titleTopicForumLabel'
          placeholder='Titulo'
          required
        />

        <MDEditor
          value={data}
          preview='edit'
          // commands={[]}
          // extraCommands={[]}
          onChange={(val) => setData(val)}/>

        <div className='forumNewTopic-btns'>
          <Link to='/' className='btn btn-danger'>
            <i className='bi bi-trash'></i> Cancelar</Link>
          <button className='btn btn-success' type='submit'>
            <i className='bi bi-floppy'></i> Crear</button>
        </div>
      </form>
    </div>
  )
}
