import { useDelete, usePut } from '@common/hooks'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'


export const TopicEdit = ({ topic, setEditing, refetch }) => {
  const { id, active, title, description, categories } = topic
  const API_URL = `http://localhost:8080/api/topics/${id}`
  const header_token = { Authorization: `Bearer ${localStorage.getItem('token')}`}
  const [formData, setData] = useState({ active, title, description })
  const [deleteTopic,, errorDelete] = useDelete(API_URL)
  const [putTopic,, errorPut] = usePut(API_URL)
  const [redirect, setRedirect] = useState(null)

  const handleDelete = async () => {
    await deleteTopic(header_token)
    if (!errorDelete) setRedirect('/temas')
  }

  const handleConfirm = async () => {
    await putTopic(formData, header_token)
    if (!errorPut) {
      refetch()
      setEditing(false)
    }
  }

  const changeValue = (name, value) => {
    setData({
      ...formData,
      [name]: value
    })
  }

  return !!redirect ? (
    <Navigate to={redirect} replace />
  ) : (
    <div className='container'>
      <input type='text'
        defaultValue={formData.title}
        onChange={(e) => { changeValue('title', e.target.value) }} />

      <MDEditor
        value={formData.description}
        preview='preview'
        onChange={(val) => { changeValue('description', val) }}
      />

      <button
        className='btn btn-outline-danger'
        onClick={() => { setEditing(false) }}
      >Cancelar</button>

      <button
        className='btn btn-outline-warning'
        onClick={handleDelete}
        >Eliminar</button>

      <button
        className='btn btn-outline-success'
        onClick={handleConfirm}
      >Aceptar</button>

      {errorDelete && <p className='h3 text-danger'>{errorDelete.message}</p>}
      {errorPut && <p className='h3 text-danger'>{errorPut.message}</p>}
    </div>
  )
}
