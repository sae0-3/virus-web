import axios from 'axios'
import { useState, useEffect } from 'react'


export const useFetchGet = (url, headers = null) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(url, headers ? { headers } : { })
      setData(data)
      setError(null)
    } catch (err) {
      setData(null)
      if (err.response) {
        setError({ status: err.response.status, message: err.response.data.message })
      } else {
        setError({ status: 500, message: err.message })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const refetch = () => { fetchData() }

  return { error, data, isLoading, refetch }
}


export const useFetchPost = (url, headers = null) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async (body) => {
    setLoading(true)

    try {
      const { data } = await axios.post(url, body, headers ? { headers } : { })
      setData(data)
      setError(null)
    } catch (err) {
      setData(null)
      if (err.response) {
        setError({ status: err.response.status, message: err.response.data.message })
      } else {
        setError({ status: 500, message: err.message })
      }
    } finally {
      setLoading(false)
    }
  }

  return { error, data, isLoading, fetchData }
}
