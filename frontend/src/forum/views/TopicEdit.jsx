import { useDelete, usePut } from '@common/hooks'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'


export const TopicEdit = ({ topic, setEditing, refetch }) => {
  const header_token = { Authorization: `Bearer ${localStorage.getItem('token')}`}
  const API_URL = `http://localhost:8080/api/topics/${topic.id}`
  const [formData, setData] = useState(topic)
  const [redirect, setRedirect] = useState(null)
  const [deleteTopic,, errorDelete] = useDelete(API_URL)
  const [putTopic,, errorPut] = usePut(API_URL)

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
    <div className='mt-5 container d-flex flex-column gap-4 fs-2'>
      <div>
        <label htmlFor='input-edit-content-topic' className='form-label'>Titulo:</label>
        <input
        className='form-control form-control-lg'
        type='text'
        defaultValue={formData.title}
        onChange={(e) => { changeValue('title', e.target.value) }}
        id='input-edit-content-topic'
        />
      </div>
      

      <label>Contenido: </label>
      <MDEditor
        value={formData.description}
        preview='preview'
        onChange={(val) => { changeValue('description', val) }}
      />

      <div className='form-check form-switch fs-2'>
        <input
          className='form-check-input'
          type='checkbox'
          id='flexSwitchCheckChecked'
          checked={!!formData.active}
          onChange={() => { changeValue('active', !formData.active) }}
        />
        <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>Activo</label>
      </div>

      <div className='btn-group w-100'>
        <button
          className='btn btn-outline-danger fs-3'
          onClick={() => { setEditing(false) }}
          >Cancelar</button>
        <button
          className='btn btn-outline-warning fs-3'
          onClick={handleDelete}
          >Eliminar</button>
        <button
          className='btn btn-outline-success fs-3'
          onClick={handleConfirm}
          >Aceptar</button>
      </div>

      {errorDelete && <p className='h3 text-danger'>{errorDelete.message}</p>}
      {errorPut && <p className='h3 text-danger'>{errorPut.message}</p>}
    </div>
  )
}
