import React from 'react'
import classes from './mail.module.css'
import { useSelector , useDispatch } from 'react-redux'
import { mailclose } from '../store/Mail'

function View() {

  const dispatch =useDispatch()

  function open (){
    dispatch(mailclose())
  }

  const data = useSelector(st => st.mails.maildata)
  return (
    <div>
        <div className={classes.main} >
      <div className={classes.close}> <button onClick={open} type="button" className="btn btn-danger">X</button></div>
        <div className={classes.mailbox} >
     <span> <h5>from : {data.sender}</h5>
       </span>
        <h7> <b>subject : </b> {data.subject}</h7>
        <hr></hr>
        <p><b> massage : </b> {data.body}</p>
        </div>
    </div>
    </div>
  )
}

export default View