import React from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { mailBox } from '../store/auth'
import Inbox from './Inbox'
import Sent from './Sent'
import { mailBoxed } from '../store/auth';
import { SentPage , SentPageClose , inboxPage , inboxPageClose } from '../store/SentBox'
import MailBox from './MailBox'

function MainPage() {

  const dispatch =useDispatch()

  function open (){
    dispatch(mailBox())
    dispatch(SentPageClose())
    dispatch(inboxPageClose())
  }

  function openInBox(){
    dispatch(inboxPage())
    dispatch(mailBoxed())
    dispatch(SentPageClose())
  }

  function sentOpen (){
    dispatch(SentPage())
    dispatch(mailBoxed())
    dispatch(inboxPageClose())
  }

  const Box =useSelector(st=>st.authh.mailboxIsOpen)
  const sentBox =useSelector(st=>st.sent.sentBox)
  const inBox =useSelector(st=>st.sent.inbox)

  return (

    <div className='container'>
    <div className='row'>
      <div className='col-3'>
      
      <div>Welcome to your mail box

<div>
  <button className='btn btn-primary btn-lg' onClick={open}>Compose</button>
</div>
<div> <h4><Link onClick={openInBox} style={{textDecoration: 'none'}} to='/inbox'>Inbox</Link></h4>
<h4><Link  style={{textDecoration: 'none'}} to='/inbox'>Starred</Link></h4>
<h4><Link  style={{textDecoration: 'none'}} to='/inbox'>Snoozed</Link></h4>
<h4><Link onClick={sentOpen} style={{textDecoration: 'none'}} to='/sent'>sent</Link></h4>
<h4><Link  style={{textDecoration: 'none'}} to='/inbox'>more</Link></h4> </div>

{Box  && <MailBox></MailBox> }
{inBox && <Inbox></Inbox>  }
{sentBox && <Sent></Sent> }
</div> 
</div>
  </div>
   </div>
  )
}

export default MainPage