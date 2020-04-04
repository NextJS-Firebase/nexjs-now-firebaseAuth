import React, { useContext } from "react"
import { firebase } from "./_app"
import router from "next/router"

import { UserContext } from "../lib/userContext"

const auth = firebase.auth()
const Signin = (data) => {
  const { user, storeUser } = useContext(UserContext)
  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    auth
      .signInWithPopup(authProvider)
      .then(async (authUser) => {
        // call the get User fuction
        console.log(authUser)
        const user = authUser.user
        const getUser = await firebase.functions().httpsCallable("getUser")
        getUser({ uid: user.uid }).then((response) => {
          console.log("from get user function, in login api")
          console.log(response.data)
          if (response.data.user) {
            storeUser({ signedIn: true })
            router.push("/")
          } else if (response.data.errors) {
            console.log(response.data.message)
          } else {
            // user isn't signed up in our db yet.
            router.push("/signup")
          }
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <button onClick={() => authenticate("Google")}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Signin
