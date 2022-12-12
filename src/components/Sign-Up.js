import React from 'react';
import { useRef } from 'react';

function SignUp() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  // const [isLogin, setIsLogin] = useState(true);
  
  const submitHandler = (event) => {
      //Prevent page reload
      event.preventDefault()
   
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
     // const confirmenteredPassword = confirmpasswordInputRef.current.value;
      
      
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD95xrn7hs64d906zROHqhu3ly8YYGyhE4',
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
          console.log(data)
          console.log('User has successfully signed up.')
          
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
          <h2>Sign Up</h2>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailInputRef}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" ref={passwordInputRef }/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label"> Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={submitHandler}>Sign up</button>
</form> 
<button type="button" class="btn btn-outline-secondary" disabled> Have an Account ? Sign up</button>
    
</div>
    </div>
    </div>
  );
}

export default SignUp;