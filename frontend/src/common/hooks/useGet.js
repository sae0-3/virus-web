import axios from 'axios'
import { useState, useEffect } from 'react'


export const useGet = (url, headers = {}) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(url, { headers })
      setData(data)
      setError(null)
    } catch (err) {
      setData(null)
      if (!!err.response) {
        const { response: { status, data: { message } } } = err
        setError({ status, message })
      } else {
        setError({ status: 500, message: err.message })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [url])

  const refetch = () => { fetchData() }

  return [data, error, isLoading, refetch]
}
