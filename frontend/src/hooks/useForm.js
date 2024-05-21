import { useState } from 'react'


export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)

  const handleInputChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  return [values, handleInputChange]
}