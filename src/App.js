import React from 'react';
import './App.css';
import Login from './components/auth/Login';
import SignUp from './components/auth/Sign-Up';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector , useDispatch} from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from './components/home page/MainPage';
import { checker } from './components/store/auth';
import { useEffect } from 'react';


function App() {

  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(checker()) },[])

const showMainPage= useSelector(state => state.authh.isAuth)
  return (
 <div>
  {showMainPage ?  <MainPage></MainPage> : <Routes>
    <Route path='/login' element={ <Login></Login> }></Route>
    <Route path='/' element={ <SignUp></SignUp>}></Route>
  </Routes> }
  <Routes>
    <Route></Route>
  </Routes>
 </div>
  );
}

export default App;
