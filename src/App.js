import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './scenes/Home.jsx';
import AdminPost from './scenes/AdminPost';
import AnimeNavbar from './components/AnimeNavbar';
import AboutMe from './scenes/AboutMe.jsx';
import Login from './scenes/Login.jsx';
import Signup from './scenes/Signup.jsx';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyCT49fTgteRcw-vifnTotEh9w8_NaN_c5s",
  authDomain: "simple-login-if.firebaseapp.com",
  projectId: "simple-login-if",
  storageBucket: "simple-login-if.appspot.com",
  messagingSenderId: "439899236558",
  appId: "1:439899236558:web:789e6055053e0922ce889f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

function App() {
  const [url, setUrl] = useState("date")
  const [googleUser, setGoogleUser] = useState(false)
  const [user, setUser] = useState(false)
  const [isUser, setIsUser] = useState(true)

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
        />
        <h1>{user.displayName}</h1>
      <Routes>
        <Route path='post' element={user
          ? <AdminPost />
          : isUser
            ? <Login user={user} setUser={setUser} setIsUser={setIsUser} />
            : 
              <Signup user={user} setUser={setUser} setIsUser={setIsUser}/>}>
        </Route>

        {isUser
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
