import axios from 'axios'
import { useState } from 'react'


export const useDelete = (url) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async (headers = {}) => {
    setLoading(true)

    try {
      const { data } = await axios.delete(url, { headers })
      setData(data)
      setError(null)
    } catch (err) {
      setData(null)
      if (err.response) {
        const { response: { status, data: { message } } } = err
        setError({ status, message })
      } else {
        setError({ status: 500, message: err.message })
      }
    } finally {
      setLoading(false)
    }
  }

  return [fetchData, data, error, isLoading]
}
