import React from 'react'
import { useState , useEffect} from 'react';
import axios from 'axios';
import classes from './mail.module.css'

function Sent() {

    const selfEmail = localStorage.getItem('Email');
    const Sendername  = selfEmail.substring(0, selfEmail.lastIndexOf("@"));
       var arr =[] 

       const [serverdata, setserverdata] = useState([]);

       useEffect(()=>{
         fetch(`https://mail-box-b88cf-default-rtdb.firebaseio.com/${Sendername}/send.json`)
         .then(Response=>Response.json()).then(jsondata =>{
         
           const propertyValues=Object.values(jsondata);
           
           setserverdata(propertyValues);
           console.log(propertyValues)
                  }).catch((err)=>
                  {
                 console.log(err);  })
     
       },[])
      
console.log(serverdata)

  return (
    <div>
<div  className={classes.sentBox}>
 {serverdata.map((data)=>{
  return <div className={classes.sentBoxEmails}>
    <h6>To : {data.receiver}  </h6>
    <p>{data.body}</p>
  </div>
 })}
</div>
    </div>
  )
}

export default Sent