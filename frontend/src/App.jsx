import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
function App() {


  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' Component={Login}></Route>
          <Route path='/signup' Component={SignUp}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
