import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const firebaseConfig = {
  apiKey: "AIzaSyCVQ__HU1Zh4JKpVt7_UUut3sNITJlbbI0",
  authDomain: "final-project-frontend-if.firebaseapp.com",
  projectId: "final-project-frontend-if",
  storageBucket: "final-project-frontend-if.appspot.com",
  messagingSenderId: "1057508308524",
  appId: "1:1057508308524:web:661aafc027a50beec7c389"
};
export default function Login({ setUser, setIsUser }) {
  const loginWithGoogle = async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const _user = await signInWithPopup(auth, provider)
      .catch(alert)
    setUser(_user.user)
  }
  const handleSumbit = async ({ email, password }) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const _user = await signInWithEmailAndPassword(auth, email, password)
      .catch(alert)
    setUser(_user.user)
  }
  return (
    <>
      <h1>hi</h1>
    </>
  )
}