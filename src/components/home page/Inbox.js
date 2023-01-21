import React from 'react'
import classes from './mail.module.css'
import { useDispatch , useSelector} from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { mailBoxed } from '../store/auth';
import { mailcount, maildata , mailclose,mailopen } from '../store/Mail'
import axios from "axios"
import View from './View'


function Inbox() {

    const dispatch =useDispatch()
    const selfEmail = localStorage.getItem('Email');
    const Sendername  = selfEmail.substring(0, selfEmail.lastIndexOf("@"));
       var arr =[] 

       const [serverdata, setserverdata] = useState([]);
       const Viewsms = useSelector(st => st.mails.mailopen)
       const [st , setst] = useState(0)

       useEffect(()=>{
         fetch(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app/${Sendername}/receive.json`)
         .then(Response=>Response.json()).then(jsondata =>{
         
           const propertyValues=Object.values(jsondata);
           
           setserverdata(propertyValues);
                  }).catch((err)=>
                  {
                 console.log(err);  })
     
       },[ st])

       setInterval(() => {
        setst(4)
       }, 2000);
      

dispatch(mailcount(serverdata.length))

const smsRead = (data)=>{
  setst(1)
  console.log(data)
  dispatch(maildata(data))
  dispatch(mailopen())
  const id= data.ID
  const redata ={
    read : true 
  }
  axios.patch(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${Sendername}/receive/${id}.json`,redata);
}


const deleteHandler= async (event,id )=>{
  event.stopPropagation();
  console.log(id)
  setst(2)
  // const receiverDlt = mailItem.receiver;
  // const nameDlt   = receiverDlt.substring(0, receiverDlt.lastIndexOf("@"));
  // const idDlt = mailItem.id;

  try{
      const res = await axios.delete(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app/${Sendername}/receive/${id}.json`)
      console.log(res)
      if(res.statusText==='OK'){
          alert('Deleted');
      }
  }catch(err){
      console.log(err);
  }
}





  return (
<div>
   {!Viewsms ? <div>
      <div  className={classes.sentBox}>
 {serverdata.map((data)=>{
 
  return <div  onClick={()=>smsRead(data)} key={data.ID} className={classes.sentBoxEmails}>
  {!data.read &&  <button className={classes.dot}></button>}
 <span> <b>from : </b>{data.sender}  </span>
 <p > <b>subject :</b> {data.subject}</p>
 <button onClick={(event)=>deleteHandler(event , data.ID) }  className={classes.delete}>Delete</button>
</div>
 })}
</div>
    </div> :
  <View></View>}
    </div>
  )
}

export default Inbox