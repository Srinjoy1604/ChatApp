import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Success from './pages/SignupSuccess';
import ChatArea from './pages/ChatArea';
import ReactDOM from 'react-dom';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/Success' Component={Success}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/register' Component={SignUp}></Route>
          <Route path="/chat" element={<PrivateRoute component={ChatArea} />} />

        </Routes>
      </AuthProvider >

    </Router>
  )
}

export default App
