import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  const handleSubmit = async () => {
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

            <Row className="d-flex justify-content-between">
              <Col sm={4} className="d-flex justify-content-center">
                <Button
                  className="mt-3 btn-lg btn-google" variant="outline-danger"
                  onClick={loginWithGoogle}
                >Google</Button>
              </Col>
              <Col sm={4} className="d-flex justify-content-center">
                <Button className="mt-3 btn-lg btn-login" variant="outline-danger" onClick={() => setIsUser(true)}>Login</Button>
              </Col>
              <Col sm={4} className="d-flex justify-content-center">
                <Button className="mt-3 btn-lg btn-signup" variant="outline-danger"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}