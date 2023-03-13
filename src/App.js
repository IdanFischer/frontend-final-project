import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './scenes/Home.jsx';
import AdminPost from './scenes/AdminPost';
import AnimeNavbar from './components/AnimeNavbar';
import AboutMe from './scenes/AboutMe.jsx';
import Login from './scenes/Login.jsx';
import Signup from './scenes/Signup.jsx';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyCVQ__HU1Zh4JKpVt7_UUut3sNITJlbbI0",
  authDomain: "final-project-frontend-if.firebaseapp.com",
  projectId: "final-project-frontend-if",
  storageBucket: "final-project-frontend-if.appspot.com",
  messagingSenderId: "1057508308524",
  appId: "1:1057508308524:web:661aafc027a50beec7c389"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

function App() {
  const [url, setUrl] = useState("date")
  const [googleUser, setGoogleUser] = useState(false)
  const [user, setUser] = useState(false) 
  const [isUser, setIsUser] = useState(true)

  console.log(user)

  useEffect(() => {
    // Listen for changes to the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (googleUser) => {
      setGoogleUser(googleUser);
    });

    // Unsubscribe when component unmounts
    return unsubscribe;
  }, []);

  // console.log("App url: ", url)
  // phase 2
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      {/* {isLoggedIn ? } */}
      <AnimeNavbar
        user={user}
        url={url}
        setUrl={setUrl}
        googleUser={googleUser}
        setGoogleUser={setGoogleUser}
        setUser={setUser}
        />
      <Routes>
        <Route path='post' element={user || googleUser
          ? <AdminPost />
          : isUser
            ? <Login user={user} setUser={setUser} setIsUser={setIsUser} />
            : 
              <Signup user={user} setUser={setUser} setIsUser={setIsUser}/>}>
        </Route>

        { user || googleUser
        ? <Route path='login' element={<Home url={url}/>}></Route>
        : isUser
          ? <Route path='login' element={
            <Login
              user={user}
              setUser={setUser}
              setIsUser={setIsUser}
            />}></Route>
          : <Route path='login' element={
            <Signup
              user={user}
              setUser={setUser}
              setIsUser={setIsUser}
            />}></Route>
        }
        <Route path='aboutme' element={<AboutMe />}></Route>
        <Route path='login' element={
          <Login
            setIsUser={setIsUser}
            user={user}
            setUser={setUser}
          />}></Route>
        <Route path='home' element={
          <Home
            url={url}
          />}></Route>
        <Route exact path='/' element={
          <Home
            url={url}
          />}></Route>
        <Route exact path='*' element={
          <Home
            url={url}
          />}></Route>
      </Routes>
    </>
  );
}

export default App;
