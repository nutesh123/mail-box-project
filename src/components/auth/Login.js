import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checker } from '../store/auth';

function Login() {
  const dispatch=useDispatch()
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  
  const submitHandler = (event) => {
      //Prevent page reload
      event.preventDefault()
   
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD95xrn7hs64d906zROHqhu3ly8YYGyhE4',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then((respo) => {
          console.log("my console respose", respo)
          if (respo.ok) {
              // ...
              return respo.json() ;
            //  console.log("if res.ok")
            } 
            else {
                  console.log("kuchh bhi else")
                  return respo.json().then((data) => {
                  let errorMessage = 'Authentication failed!';
                   if (data && data.error && data.error.message) 
                   {
                    errorMessage = data.error.message;
                   }
            
                   throw new Error(errorMessage);
                  });
          }
      }).then((data) => {
        localStorage.setItem('JWTTOKEN',data.idToken);
          console.log('User has successfully login.')
          dispatch(checker(true))
          
        })
        .catch((err) => {
          console.log(err)
          alert(err.message);
        });

  }
  return (
      <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <h2>Login</h2>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailInputRef}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" ref={passwordInputRef }/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={submitHandler}>Login</button>
</form> 
<Link to='/'><button type="button"  class="btn btn-outline-secondary" > Dont Have an Account ? Sign up</button></Link>
    
</div>
    </div>
    </div>
  );
}

export default Login;