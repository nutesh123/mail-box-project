import React from 'react';
import './App.css';
import Login from './components/auth/Login';
import SignUp from './components/auth/Sign-Up';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from './components/home page/MainPage';

function App() {
const showMainPage= useSelector(state => state.authh.isAuth)
  return (
 <div>
  {showMainPage ?  <MainPage></MainPage> : <Routes>
    <Route path='/login' element={ <Login></Login> }></Route>
    <Route path='/' element={ <SignUp></SignUp>}></Route>
  </Routes> }
 </div>
  );
}

export default App;
