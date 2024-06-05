import { io } from 'socket.io-client'


export const socket = io('/chat', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
