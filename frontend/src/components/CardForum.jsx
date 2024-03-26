import { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import personIcon from '../../node_modules/bootstrap-icons/icons/person-circle.svg'
import '../styles/CardForum.css'


export const CardTopic = () => {
  const markdownTaskList = `
  ### Title
  \`go build main.go\`

  - [ ] Task list 1
  - [ ] Pending task list 2
  - [x] Completed task list 3
  - [x] Completed task list 4

  | Nombre    | Edad | Ciudad   |
  | --------- | ---- | -------- |
  | Juan      | 25   | Madrid   |
  | María     | 30   | Barcelona|
  | Carlos    | 28   | Valencia |
`

  const [iconHeart, setIconHeart] = useState('heart')
  const [iconShare, setIconShare] = useState('share')
  const [iconStar, setIconStar] = useState('star')
  const [iconReply, setIconReply] = useState('reply')

  const handleClick = (icon, funcIcon) => {
    const data = icon.split('-')
    const newIcon = (data.length === 2) ? data[0] : `${icon}-fill`
    funcIcon(newIcon)
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
            children={markdownTaskList}
            remarkPlugins={[remarkGfm]} />
        </div>
      </div>

      <div className='card-footer'>
        <div className="btns">
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconHeart, setIconHeart) }}
          ><i className={`bi bi-${iconHeart}`}></i></button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconShare, setIconShare) }}
          ><i className={`bi bi-${iconShare}`}></i></button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconStar, setIconStar) }}
          ><i className={`bi bi-${iconStar}`}></i></button>
          <button
            type='button'
            className='btn'
            onClick={() => { handleClick(iconReply, setIconReply) }}
          ><i className={`bi bi-${iconReply}`}></i></button>
        </div>
      </div>
    </div>
  )
}
