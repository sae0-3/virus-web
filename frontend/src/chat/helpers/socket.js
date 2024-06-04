import { io } from 'socket.io-client'


export const socket = io('http://localhost:4000', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
