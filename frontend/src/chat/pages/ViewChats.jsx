import { useUser } from '@auth/hooks'
import { socket } from '@chat/helpers'
import userIcon from '@common/assets/user.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const ViewChats = () => {
  const [{ id: authenticated_id }] = useUser()
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const getData = () => {
    socket.emit('client:getAll')
    socket.on('server:getAll', (data) => { setData(data) })
  }

  useEffect(() => { getData() }, [])

  socket.on('server:newMessage', () => { getData })

  const handleClick = async () => {
    const username = document.getElementById('chat-id-user').value

    try {
      const { data: { id } } = await axios.get(`http://localhost:4000/chat/${username}`)

      if (id === authenticated_id) {
        setError('No se puede enviar mensajes a si mismo')
        return
      }

      navigate(`/chat/${id}`)
    } catch (error) {
      setError('No se encontro el usuario')
    }
  }

  return (
    <div className='container'>
      <section className='input-group flex-nowrap mt-4 mb-5'>
        <span className='input-group-text fs-3' id='addon-wrapping'>@</span>
        <input type='text'
          id='chat-id-user'
          className='form-control fs-4 form-control-lg'
          placeholder='Username'
          aria-label='Username'
          aria-describedby='addon-wrapping'
        />
        <button type='button'
          className='btn btn-outline-success btn-lg'
          onClick={handleClick}
        >Chatear</button>
      </section>

      {!!error && 
        <p className='h5 text-center text-danger m-4'>{ error }</p>
      }

      {!!data && data.length === 0 ? (
        <p className='h1 mt-5 text-center'>No hay Chats</p>
      ) : (
        <section className='mt-5 list-group'>
          {data.map(({ user, date }) => {
            if (!user.profile) {
              user.profile = userIcon
            }

            return (
              <Link
                key={user.id}
                to={`/chat/${user.id}`}
                className='list-group-item list-group-item-action'
              >
                <div className='d-flex w-100 align-items-center justify-content-between'>
                  <div className='d-flex align-items-center mt-3 mb-3 gap-3 text-decoration-none'>
                    <img style={styleImage}
                      src={user.profile}
                      alt={`profile ${user.username}`} />
                    <span className='h2 fw-bold text-light'>{ user.username }</span>
                  </div>

                  <small className=' fs-5'>{ date }</small>
                </div>
              </Link>
            )
          })}
        </section>
      )}
    </div>
  )
}

const styleImage = {
  width: '5rem',
  height: '5.2rem',
  borderRadius: '.8rem',
  objectFit: 'cover',
}
