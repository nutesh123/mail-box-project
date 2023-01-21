import React from 'react'
import { useState , useEffect} from 'react';
import axios from 'axios';
import classes from './mail.module.css'
import { mailopen } from '../store/Mail';
import { useDispatch , useSelector} from 'react-redux';
import { maildata } from '../store/Mail';
import View from './View';

function Sent() {


  const dispatch =useDispatch()

  const Viewsms = useSelector(st => st.mails.mailopen)
    const selfEmail = localStorage.getItem('Email');
    const Sendername  = selfEmail.substring(0, selfEmail.lastIndexOf("@"));
       var arr =[] 

       const [serverdata, setserverdata] = useState([]);

       useEffect(()=>{
         fetch(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${Sendername}/send.json`)
         .then(Response=>Response.json()).then(jsondata =>{
         
           const propertyValues=Object.values(jsondata);
           
           setserverdata(propertyValues);
           console.log(propertyValues)
                  }).catch((err)=>
                  {
                 console.log(err);  })
     
       },[])

       const smsRead = (data)=>{
        console.log(data)
        dispatch(maildata(data))
        dispatch(mailopen())
        const id= data.ID
        const redata ={
          read : true 
        }
        axios.patch(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app//${Sendername}/send/${id}.json`,redata);
      }
      
       const deleteHandler= async (event,id )=>{
        event.stopPropagation();
        console.log(id)
        // const receiverDlt = mailItem.receiver;
        // const nameDlt   = receiverDlt.substring(0, receiverDlt.lastIndexOf("@"));
        // const idDlt = mailItem.id;
      
        try{
            const res = await axios.delete(`https://mailbox-794b3-default-rtdb.asia-southeast1.firebasedatabase.app/${Sendername}/send/${id}.json`)
            console.log(res)
            if(res.statusText==='OK'){
                alert('Deleted');
            }
        }catch(err){
            console.log(err);
        }
      }
      
      console.log(serverdata)
  return (
    <div>
 {!Viewsms ? <div>
      <div  className={classes.sentBox}>
 {serverdata.map((data)=>{
 
  return <div  onClick={()=>smsRead(data)} key={data.ID} className={classes.sentBoxEmails}>
  {!data.read &&  <button className={classes.dot}></button>}
 <span> <b> to : </b>{data.receiver}  </span>
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

export default Sent