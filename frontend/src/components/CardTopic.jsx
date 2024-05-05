import { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import personIcon from '../../node_modules/bootstrap-icons/icons/person-circle.svg'
import '../styles/CardTopic.css'


export const CardTopic = ({ content }) => {
  const [iconLike, setIconLike] = useState('hand-thumbs-up')
  const [iconShare, setIconShare] = useState('share')
  const [iconSave, setIconSave] = useState('bookmark')
  const [iconReport, setIconReport] = useState('exclamation-triangle')

  const handleClick = (icon, callback) => {
    const data = icon.split('-')
    const newIcon = (data[data.length - 1] === 'fill')
        ? icon.replace('-fill', '')
        : `${icon}-fill`
    callback(newIcon)
  }

  return (
    <div className='cardTopic card'>
      <div className='card-header'>
        <a href='#' className='profile-info'>
          <img src={personIcon} alt='user profile' />
          <h5 className='username'>username</h5>
        </a>
        <span className='date'>24/03/2024</span>
      </div>

      <div className='card-body'>
        <div className='markdown-content'>
          <Markdown
            children={content}
            remarkPlugins={[remarkGfm]} />
        </div>
      </div>

      <div className='card-footer'>
        <div className="btns">
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconLike, setIconLike) }}
          ><i className={`bi bi-${iconLike}`}></i></button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconShare, setIconShare) }}
          ><i className={`bi bi-${iconShare}`}></i></button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconSave, setIconSave) }}
          ><i className={`bi bi-${iconSave}`}></i></button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconReport, setIconReport) }}
          ><i className={`bi bi-${iconReport}`}></i></button>
        </div>
      </div>
    </div>
  )
}