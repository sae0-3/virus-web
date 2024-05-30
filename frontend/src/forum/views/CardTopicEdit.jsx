import { useDelete, usePut } from '@common/hooks'
import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'


export const CardTopicEdit = ({ content, setEditing, refetch}) => {
  const header_token = { Authorization: `Bearer ${localStorage.getItem('token')}` }
  const [putData] = usePut(`http://localhost:8080/api/comments/${content.id}`)
  const [deleteData] = useDelete(`http://localhost:8080/api/comments/${content.id}`)
  const [value, setValue] = useState(content.description)

  const handleDelete = async () => {
    await deleteData(header_token)
    setEditing(false)
    refetch()
  }

  const handleConfirm = async () => {
    const newComment = {
      salient: false,
      description: value,
    }
    await putData(newComment, header_token)
    setEditing(false)
    refetch()
  }

  return (
    <div className='mt-5 mb-5'>
      <MDEditor
        value={value}
        preview='edit'
        onChange={(val) => { setValue(val) }}
      />

      <div className='btn-group w-100'>
        <button
          className='btn btn-outline-danger fs-4'
          onClick={() => { setEditing(false) }}
        >Cancelar</button>
        <button
          className='btn btn-outline-warning fs-4'
          onClick={handleDelete}
        >Eliminar</button>
        <button
          className='btn btn-outline-success fs-4'
          onClick={handleConfirm}
        >Aceptar</button>
      </div>
    </div>
  )
}
