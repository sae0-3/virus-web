import { useState, useEffect } from 'react'
import { usePost } from './useFetch'


export const useCheckSesion = () => {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState(null)
  const [fetchData, data, error, isLoading] = usePost('http://localhost:8000/auth/verify')

  useEffect(() => {
    fetchData(null, { Authorization: `Bearer ${token}` })
  }, [token])

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setUser(null)
    }
  }, [error])

  return { isAuthentic: !!user, user, isLoading }
}
