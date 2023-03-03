import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './scenes/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import AdminPost from './scenes/AdminPost';

function App() {
  // phase 2
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      {/* {isLoggedIn ? } */}
      <Routes>
        <Route path='post' element={<AdminPost />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='*' element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
