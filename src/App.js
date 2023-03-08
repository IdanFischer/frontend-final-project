import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './scenes/Home.jsx';
import AdminPost from './scenes/AdminPost';
import AnimeNavbar from './components/AnimeNavbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState("date")
  console.log("App url: ", url)
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
