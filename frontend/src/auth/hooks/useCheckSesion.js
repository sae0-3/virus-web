import axios from 'axios'
import { useUser } from '@auth/hooks'
import { useEffect, useState } from 'react'


const validateToken = async () => {
  const token = localStorage.getItem('token')

  try {
    const { data } = await axios.post(
      'http://localhost:8000/auth/verify',
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return {
      ...data,
      isAuthenticated: true
    }
  } catch (error) {
    return {
      isAuthenticated: false
    }
  }
}

export const useCheckSesion = () => {
  const [user, setUser] = useUser()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    validateToken().then((userData) => {
      setUser(userData)
      setLoading(false)
    })
  }, [])

  return [!!user.isAuthenticated, isLoading]
}
