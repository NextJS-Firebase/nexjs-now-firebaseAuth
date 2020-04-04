import React, { createContext, useState } from "react"
import { useRouter } from "next/router"
export const UserContext = createContext()
const UserContextProvider = (props) => {
  const [user, setUser] = useState({})
  const storeUser = (user) => {
    setUser({
      ...user,
    })
  }
  const logout = () => {
    setUser({})
  }
  return (
    <UserContext.Provider value={{ user, storeUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContextProvider
