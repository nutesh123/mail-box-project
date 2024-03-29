import React from 'react'
import JoditEditor from 'jodit-react';
import { useState , useRef } from 'react';
import classes from './mail.module.css'
import { useDispatch } from 'react-redux';
import { mailBoxed } from '../store/auth';
import { inboxPage } from '../store/SentBox';
import axios from 'axios';

function MailBox() {

  const dispatch =useDispatch()

  function close (){
    dispatch(mailBoxed())
    dispatch(inboxPage())
  }

  const editor = useRef(null);
	const [content, setContent] = useState('');
  console.log(content)

  const emailidRef = useRef();
  const SubjectRef = useRef();
  

const submitHandler=async(event)=>{
  
    event.preventDefault();   
    const receiver = emailidRef.current.value;
    const sender = localStorage.getItem('Email');
    
    const name   = receiver.substring(0, receiver.lastIndexOf("@"));
    const Sendername  = sender.substring(0, sender.lastIndexOf("@"));
   
    const data={
        sender:sender,
        receiver:receiver,
        subject:SubjectRef.current.value,
        body:content,
        read:false,
        ID : ''
    }
    try{
        const res = await axios.post(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${name}/receive.json`,data);
        console.log(res.statusText==='OK');
        const id =res.data.name 

      const redata = {
          ID : id
        }            
        axios.patch(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${name}/receive/${id}.json`,redata);
        if(res.statusText==='OK'){
            
            const res2 = await axios.post(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${Sendername}/send.json`,data);
            if(res2.statusText==='OK'){
              axios.patch(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${Sendername}/send/${id}.json`,redata);
              alert('Mail Send Successfull');
            }else{
                throw new Error('Something Went wrong!');
            }

        }else{
          throw new Error('Something Went wrong!');
        }
    }catch(err){
        alert(err);
        console.log('got it')
    }
}

  return (
    <div className={classes.main} >
      <div className={classes.close}> <button type="button" onClick={close} className="btn btn-danger">X</button></div>
        <div className={classes.mailbox} >
        <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">to</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="enter email" ref={emailidRef}/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Subject</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" ref={SubjectRef}/>
  </div>
  <JoditEditor
			ref={editor}
			value={content}
		//	config={config}
			tabIndex={1} // tabIndex of textarea
			// preferred to use only this option to update the content for performance reasons
			onChange={newContent => { setContent(newContent)}}
		/>
    <button type="button" onClick={submitHandler} class="btn btn-primary btn-sm">Send</button>
</form>
        </div>
    </div>
  )
}

export default MailBox