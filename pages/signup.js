import React, { useContext } from "react"
import router from "next/router"
import { firebase } from "./_app"

export default () => {
  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    auth
      .signInWithPopup(authProvider)
      .then(() => router.push("/"))
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <p>Welcome! Looks like you need an account.</p>
      <button onClick={() => authenticate("Google")}>Sign up</button>
    </div>
  )
}
