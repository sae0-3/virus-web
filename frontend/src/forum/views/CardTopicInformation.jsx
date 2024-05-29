import { useUser } from '@auth/hooks'
import { useGet, usePost } from '@common/hooks'
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

export const CardTopicInformation = ({ content, isOwner, isComment, setEditing }) => {
  const { id, author, description, created_at } = content
  const [{ id: user_id, token }] = useUser()
  const header_token = { Authorization: `Bearer ${token}` }
  const [data] = useGet( `http://localhost:8080/api/users/${user_id}`, header_token )
  const { saved, interested } = !!data && data
  const [postSaved, , errorSaved] = usePost(
    `http://localhost:8080/api/saved/${id}`)
  const [postInterested, , errorInterested] = usePost(
    `http://localhost:8080/api/interested/${id}`)

  const handleLike = ({ target }) => {
    postInterested(null, header_token)
    if (!errorInterested) changeIcon(target)
  }

  const handleSave = ({ target }) => {
    postSaved(null, header_token)
    if (!errorSaved) changeIcon(target)
  }

  const handleReply = ({ target }) => {
  }

  return (!!data &&
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
          {isOwner && isComment &&
            <button
              type='button'
              className='btn'
              onClick={() => { setEditing(true) }}
            ><i className='bi bi-pencil-square'></i>
            </button>
          }
          <button
            type='button'
            className='btn'
            onClick={handleLike}
          ><i className={
            interested.includes(id)
              ? 'bi bi-hand-thumbs-up-fill'
              : 'bi bi-hand-thumbs-up'
          }></i>
          </button>
          <button
            type='button'
            className='btn'
            onClick={handleSave}
          ><i className={
            saved.includes(id)
              ? 'bi bi-bookmark-fill'
              : 'bi bi-bookmark'
          }></i>
          </button>
          {!isComment && !!content.active &&
            <button
              type='button'
              className='btn'
              onClick={handleReply}
            ><i className='bi bi-reply'></i>
          </button>}
        </div>
      </div>
    </div>
  )
}
