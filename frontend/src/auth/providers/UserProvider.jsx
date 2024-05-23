import { UserContext } from '@auth/contexts'
import { useState } from 'react'


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthtenticated: false })

  return (
    <UserContext.Provider value={ [user, setUser] }>
      { children }
    </UserContext.Provider>
  )
}
