import { usePost } from '@common/hooks'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export const TopicCommented = ({ topic, setCommented, refetch }) => {
  const { id, title } = topic
  const [postComment, , error] = usePost('http://localhost:8080/api/comments')
  const [value, setValue] = useState('')

  const handleConfirm = async () => {
    await postComment(
      { topic_id: id, description: value },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    if (!error) {
      refetch()
      setCommented(false)
    }
  }

  return (
    <div className='container d-flex flex-column gap-5'>
      <h2 className='fs-1 mt-5 pt-4 text-center'
        >Comentando: <Link to=''
          className='fw-bold'
          onClick={() => { setCommented(false) }}
        >{title}</Link>
      </h2>

      <MDEditor
        value={value}
        preview='edit'
        onChange={(val) => { setValue(val) }}
      />

      <div className='btn-group w-100 btn-group-lg'>
        <button type='button'
          className='btn btn-outline-danger'
          onClick={() => { setCommented(false) }}
          >Cancelar</button>
        <button type='button'
          className='btn btn-outline-success'
          onClick={handleConfirm}
          >Aceptar</button>
      </div>
    </div>
  )
}
