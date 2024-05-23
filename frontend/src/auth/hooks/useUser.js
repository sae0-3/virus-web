import { UserContext } from '@auth/contexts'
import { useContext } from 'react'


export const useUser = () => {
  return useContext(UserContext)
}
