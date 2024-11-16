import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'
import Home from './component/Home'
import About from './component/About'
import NoteState from './context/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
function App() {
  return (
<>
<NoteState>
<Router>
<Navbar/>
  <div>
    <Routes>
      <Route path='/' element={
        <>
        <Home/>
        </>
      }/>
      <Route path='/About' element={
        <>
        <About/>
        </>
      }/>
      <Route path='/login' element={
        <>
        <Login/>
        </>
      }/>
      <Route path='/signup' element={
        <>
        <Signup/>
        </>
      }/>
    </Routes>
  </div>
</Router>
</NoteState>
</>
  );
}

export default App;
