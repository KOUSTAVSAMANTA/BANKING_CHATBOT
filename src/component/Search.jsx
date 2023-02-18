import React, { useState,useContext} from 'react'
import { ChatContext } from '../Context/Chatcontext';

const services = ["F&Q","Crete User","Make Payment","Account Info"]

localStorage.setItem("Selected",null)

const Search = () => {

  const [username,setUsername] = useState("")
  const [user,setUser] = useState(null)
  const [err, setErr] = useState(false);

  const handleSearch =()=>{
    try{
      const lower = services.map(element => {
        return element.toLowerCase();
      });
      const getService = lower.includes(username.toLowerCase());
      const servic = services.find(element => element.toLowerCase() === username.toLowerCase()); 
      console.log(getService)
      if (getService === true){
        setUser(servic)
      }
      else{
        setErr(true)
      }
    }catch(err){
      setErr(true)
    }


  }

  const handleKey = e=>{
    e.code === "Enter" && handleSearch();
  }
  
  const {dispatch} = useContext(ChatContext);
  const handleSelect = ()=>{


    if (username==="Crete User"){
      let x = {"user":username, "msg":{"Crete User":{chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"Do you want to continue as form or by chat?"}]}}}
      dispatch({type:"select_service",payload:x})
    }else if (username==="Account Info"){
      let x = {"user":username, "msg":{"Account Info":{chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"press 2 to see Account details"}]}}}
      dispatch({type:"select_service",payload:x})
    }else if (username==="Make Payment"){
      let x = {"user":username, "msg":{"Make Payment":{chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"Please provide the payee name"}]}}}
      dispatch({type:"select_service",payload:x})
    }else if (username==="Update Field"){
      let x = {"user":username, "msg":{"Update Field":{chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"Please Enter Account number to change details"}]}}}
      dispatch({type:"select_service",payload:x})
    }
    else{
      dispatch({type:"CHANGE_USER",payload:username})
    }
    // localStorage.setItem("Selected",u)
    // localStorage.setItem("Selected",username)
    // dispatch({type:"CHANGE_USER",payload:username})
    localStorage.setItem("Selected",user)
    setUser(null)
    setUsername("")
  }


  return (
    <div className='search'>
      <div className="searchForm">
        <input type='text' placeholder='Find a Service'onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
      </div>
      {err && <span>Service not found</span>}
      { user && <div className="userChat" onClick={handleSelect}>
        <img src="data:image/jpeg;base64,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" alt="" />{/*image of the 1st service */}
        <div className="userChatInfo">
          <span>{user}</span>{/* number of services*/}
        </div>
      </div>}
    </div>
  )
}

export default Search