import { useUser } from '@auth/hooks'
import { socket } from '@chat/helpers'
import userIcon from '@common/assets/user.png'
import { useGet } from '@common/hooks'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '@chat/styles/Chat.css'


export const Chat = () => {
  const user_destiny = location.pathname.split('/').pop()
  const [{ id: user_origin }] = useUser()
  const [messages, setMessages] = useState([])
  const [udd, error] = useGet(`http://localhost:8080/api/users/${user_destiny}`)

  const getMessages = () => {
    socket.emit('client:getById', user_destiny)
    socket.on('server:getById', (data) => {
      setMessages(data)
    })
  }

  useEffect(() => {
    getMessages()
    socket.on('server:post', ({ from, to }) => {
      if (user_origin.toString() === from.toString() || user_origin.toString() === to.toString()) {
        getMessages()
      }
    })

    return () => {
      socket.off('server:getById')
      socket.off('server:post')
    }
  }, [])

  const handleSend = async (e) => {
    e.preventDefault()

    const content = document.getElementById('chat-input-message').value
    if (content.length !== 0) {
      socket.emit('client:post', content, user_destiny)
      document.getElementById('chat-input-message').value = ''
    }
  }

  return error || user_destiny === user_origin.toString() ? (
    <Navigate to='/chat' replace />
  ) : (
    <div className='container'>
      <section className='chat mt-4'>
        {!!udd &&
          <Link
            to={`/usuario/${udd.id}`}
            className='h1
              text-decoration-none
              d-flex align-items-center
              mb-4
              justify-content-center gap-3'
          >
            <img
              src={udd.profile || userIcon}
              style={imageStyle}
              alt={`profile ${udd.username}`} />
            <span>{ udd.username }</span>
          </Link>
        }

        <ul className='list-group list-group-flush messages'>
          {!!messages && !!messages.length &&
            messages.map(({ id, content, origin, destiny }) => {
              const aux = origin.id === user_origin ? 'end' : 'start'              

              return (
                <li key={id}
                  className={`list-group-item text-${aux} fs-4`}
                >{ content }</li>
              )
            })
          }
        </ul>

        <form
          className='input-group pt-4'
          onSubmit={handleSend}
          id='chat-messsages-form'
        >
          <input
            className='form-control form-control-lg fs-3'
            type='text'
            name='chat-input-message'
            id='chat-input-message'
            placeholder='Mensaje'
            autoComplete='off' />
          <input
            className='btn btn-success btn-lg fs-3'
            type='submit' />
        </form>
      </section>
    </div>
  )
}

const imageStyle = {
  width: '5rem',
  height: '5.2rem',
  borderRadius: '.8rem',
  objectFit: 'cover',
}
