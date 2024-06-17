import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={Login}></Route>
        <Route path='/register' Component={SignUp}></Route>
      </Routes>
    </Router>
  )
}

export default App
