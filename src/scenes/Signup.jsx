import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

export default function Signup({ setUser, setIsUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  let navigate = useNavigate()

  const loginWithGoogle = async () => {
    try {
      // const _user = await signInWithPopup(auth, provider)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success("Logged in")
      navigate("/home")
    }
    catch (err) {
      console.error(err)
    }
  }

  const handleSumbit = async () => {
    const _user = await createUserWithEmailAndPassword(auth, email, password)
      .catch(alert)
    setUser(_user)
  }
    // const signupWithGoogle = async () => {
    //   const app = initializeApp(firebaseConfig);
    //   const auth = getAuth(app)
    //   const provider = new GoogleAuthProvider()
    //   const _user = await signInWithPopup(auth, provider)
    //     .catch(toast.error("Google auth isn't currently working, please use another method! "))
    //   setUser(_user)
    // }
  return (
    <>
      <div className="background-image-login">
        <div className="form-container-login p-lg-3 p-md-3 p-sm-3">
          <h1 className="outside-text-form ms-2">Sign Up</h1>
            <Button type="primary" onClick={() => setIsUser(true)}>Login</Button>

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
                onClick={handleSumbit}
              >
                SignUp
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}