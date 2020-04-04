import React, { useEffect, useContext } from "react"
import { firebase } from "./_app"
import router from "next/router"
import { UserContext } from "../lib/userContext"

// export async function getServerSideProps({ req, query }) {
//   const user = req && req.session ? req.session.decodedToken : null;
//   // don't fetch anything from firebase if the user is not found
//   // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
//   // const messages = snap && snap.val()
//   const messages = null;
//   return {
//     props: {
//       user: user || null,
//       messages
//     }
//   };
// }

const Index = (props) => {
  const { user, storeUser } = useContext(UserContext)
  const handleLogout = () => {
    firebase.auth().signOut()
    storeUser({})
    router.push("/signin")
  }
  const redirect = () => {
    if (!user.signedIn) {
      router.push("/signin")
    }
  }
  useEffect(() => {
    async function getUser() {
      const helloWorld = firebase.functions().httpsCallable("helloWorld")
      helloWorld()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // getUser()
  }, [])
  useEffect(() => {
    redirect()
  }, [])

  if (user && user.signedIn)
    return (
      <div>
        {console.log(props)}
        <button onClick={handleLogout}>Logout</button>
        <div>
          <form onSubmit={() => console.log("submit")}>
            <input
              type={"text"}
              onChange={() => console.log("change")}
              placeholder={"add message..."}
              value={null}
            />
          </form>
        </div>
      </div>
    )
  return null
}
// Note: Get initial props won't work since we're wrapping with an HOC.
// Consider using the swr hook from the Next team.
export default Index
