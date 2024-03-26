import { useState } from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'
import '../styles/ForumNewTopic.css'


export const ForumNewTopic = () => {
  const [value, setValue] = useState('')
  const [categorias, setCategorias] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState('')

  const handlePrevent = (e) => {
    e.preventDefault()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      handlePrevent(e)
      agregarCategoria()
    }
  }

  const agregarCategoria = () => {
    const categoria = nuevaCategoria.trim()
    if (categoria && !categorias.includes(categoria)) {
      setCategorias([...categorias, categoria])
      setNuevaCategoria('')
    }
  }

  const handleInputChange = (e) => {
    setNuevaCategoria(e.target.value)
  }

  return (
    <div className='container forumNewTopic'>
      <h3 className='forumNewTopic-title'>Nuevo Tema</h3>

      <form className='addTopic'>
        <input
          autoComplete='off'
          type='text'
          className='form-control'
          id='titleTopicForumLabel'
          placeholder='Titulo'
          required
        />

        <div className="forumNewTopic-categories">
          <input
            aria-autocomplete='list'
            autoComplete='off'
            type="text"
            className="form-control"
            id="categorias"
            placeholder="Categorias"
            value={nuevaCategoria}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyPress}
          />
          <div id="categorias-seleccionadas">
            {categorias.map((categoria, index) => (
              <span key={index} className="badge badge-primary m-2">
                {categoria}
              </span>
            ))}
          </div>
        </div>

        <MDEditor
          value={value}
          preview='edit'
          // commands={[]}
          // extraCommands={[]}
          onChange={(val) => setValue(val)}/>

        <div className="forumNewTopic-btns">
          <a href="#" className='btn btn-danger'>
            <i className='bi bi-trash'></i> Cancelar</a>
          <button className='btn btn-success' type='submit'>
            <i className='bi bi-floppy'></i> Crear</button>
        </div>
      </form>
    </div>
  )
}
