import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    const [auth,setAuth] = useState(false);
    const [message,setMessage] = useState('')
    const [name, setName] = useState('')
    axios.defaults.withCredentials = true

    useEffect(()=> {
        axios.get("http://localhost:8080/")
        .then(res => {
            if(res.data.Status === "Success"){
                setAuth(true)
                setName(res.data.name)
            } else {
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err => console.log(err))
    },[])

    const handleLogout = () =>{
        axios.get("http://localhost:8080/logout")
        .then(res => {
            document.location.reload(true)     
        }).catch(err => console.log(err))
    }

  return (
    <>
    <div><h1>Home</h1></div>
    <div>
        {
            auth? 
            <div>
                <h3>Welcome! {name}</h3>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <h3>Hi guest!</h3>
                <Link to="/login"><button className='btn btn-primary'>Login</button></Link>
            </div>
        }
    </div>
    </>
  )
}
