import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './scenes/Home.jsx';
import AdminPost from './scenes/AdminPost';
import AnimeNavbar from './components/AnimeNavbar';
import AboutMe from './scenes/AboutMe.jsx';
import Login from './scenes/Login.jsx';
import Signup from './scenes/Signup.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState("date")
  // console.log("App url: ", url)
  // phase 2
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      {/* {isLoggedIn ? } */}
      <AnimeNavbar
        url={url}
        setUrl={setUrl}
      />
      <Routes>
        <Route path='post' element={<AdminPost />}></Route>
        <Route path='aboutme' element={<AboutMe />}></Route>
        <Route path='signup' element={<Signup />}></Route>
        <Route path='login' element={<Login />}></Route>
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
