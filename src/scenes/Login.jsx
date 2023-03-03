// import { useEffect, useState } from "react"
// import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyDCdNb4fafN6PR1mUX_w7jgkwzad69-Fro",
//   authDomain: "playful-pixels-frontend.firebaseapp.com",
//   projectId: "playful-pixels-frontend",
//   storageBucket: "playful-pixels-frontend.appspot.com",
//   messagingSenderId: "943914064966",
//   appId: "1:943914064966:web:73907ec6940f0731207e47",
//   measurementId: "G-053L8SE3W9"
// };

// export default function Login() {
//   const handleSignin = () => {
//     // connect to firebase project
//     const app = initializeApp(firebaseConfig)
//     // connect to auth
//     const auth = getAuth(app)
//     // create a provider
//     const provider = new GoogleAuthProvider()
//     // popup signin window
//     signInWithPopup(auth, provider)
//       // handle .then and .catch
//       .then(() => setIsLoggedIn(true))
//       .catch(alert)
//   }
//   return (
//     <>
//       <h1>Login</h1>
//     </>
//   )
// }
