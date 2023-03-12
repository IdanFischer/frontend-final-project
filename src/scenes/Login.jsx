import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import './login.css'

const firebaseConfig = {
  apiKey: "AIzaSyCVQ__HU1Zh4JKpVt7_UUut3sNITJlbbI0",
  authDomain: "final-project-frontend-if.firebaseapp.com",
  projectId: "final-project-frontend-if",
  storageBucket: "final-project-frontend-if.appspot.com",
  messagingSenderId: "1057508308524",
  appId: "1:1057508308524:web:661aafc027a50beec7c389"
};

export default function Login({ user, setUser, setIsUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let navigate = useNavigate()

  const loginWithGoogle = async () => {
    try {
      // const _user = await signInWithPopup(auth, provider)
      const provider = new GoogleAuthProvider()
      const result = await signInWithRedirect(auth, provider)
      setUser(result.user) 
      toast.success("Logged in")
      navigate("/home")
    }
    catch (err) {
      console.error(err)
    }
    // setUser(_user)

  }

  const handleSubmit = async () => {
    try {
      const _user = await signInWithEmailAndPassword(auth, email, password)
      setUser(_user)

    } 
    catch {
      (toast.error("Wrong Email or Password"))
    }
  }
  return (
    <>
      <div className="background-image-login">
        <div className="form-container-login p-lg-3 p-md-3 p-sm-3">
          <h1 className="outside-text-form ms-2">Login</h1>
          <Button type="primary" onClick={() => setIsUser(false)}>Sign Up</Button>

          <Form>
            <Form.Group>
              <Form.Label className="outside-text-three ms-2">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                required={true}
                placeholder="Enter Email Here"
                value={email}
                className="p-2"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="outside-text-three ms-2">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                required={true}
                placeholder="Enter Password Here"
                value={password}
                className="p-2"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button className="mt-3 btn-lg btn-login" variant="outline-danger"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
        <Button
          className="google-sign-in-button"
          onClick={loginWithGoogle}
        >Google</Button>
      </div>
    </>
  )
}