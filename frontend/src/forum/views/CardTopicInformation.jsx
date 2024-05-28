import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import userIcon from '@common/assets/user.png'


const changeIcon = (element) => {
  const tmp = element.querySelector('.bi')

  if (!!tmp) { element = tmp }

  element.className = element.className.includes('fill')
    ? element.className.replace('-fill', '')
    : element.className + '-fill'
}

export const CardTopicInformation = ({ content, isOwner }) => {
  const { author, description, created_at } = content

  const handleEdit = ({ target }) => {
  }

  const handleLike = ({ target }) => {
    changeIcon(target)
  }

  const handleSave = ({ target }) => {
    changeIcon(target)
  }

  const handleReply = ({ target }) => {
  }

  return (
    <div className='cardTopic card'>
      <div className='card-header'>
        {!!author &&
          <Link to={`/usuario/${author.id}`} className='profile-info'>
            <img src={author.profile || userIcon} alt='user profile' />
            <h5 className='username'>{author.username}</h5>
          </Link>
        }
        <span className='date'>{created_at}</span>
      </div>

      <div className='card-body'>
        <div className='markdown-content'>
          <Markdown
            children={description}
            remarkPlugins={[remarkGfm]} />
        </div>
      </div>

      <div className='card-footer'>
        <div className="btns">
          {isOwner &&
            <button
              type='button'
              className='btn'
              onClick={handleEdit}
            ><i className='bi bi-pencil-square'></i>
            </button>
          }
          <button
            type='button'
            className='btn'
            onClick={handleLike}
          ><i className='bi bi-hand-thumbs-up'></i>
          </button>
          <button
            type='button'
            className='btn'
            onClick={handleSave}
          ><i className='bi bi-bookmark'></i>
          </button>
          <button
            type='button'
            className='btn'
            onClick={handleReply}
          ><i className='bi bi-reply'></i>
          </button>
        </div>
      </div>
    </div>
  )
}
