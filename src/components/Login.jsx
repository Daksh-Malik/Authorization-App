import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [values,setValues] = useState({
        email: '',
        password: ""
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/login", values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate("/")
            } else {
                alert("Email or Password is incorrect")
                // alert(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input type="email" onChange={e => setValues({...values, email:e.target.value})} className="form-control" name="email" placeholder='Enter Email' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                            <input type="password" onChange={e => setValues({...values, password:e.target.value})} className="form-control" name="password" placeholder='Enter Password' />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Submit</button>
                        <p className='form-text'>You agree to our terms and policies.</p>
                        <Link to="/register"><button className='btn btn-default border w-100 bg-light text-decoration-none'>Create Account</button></Link>
                    </form>
                </div>
            </div>
        </>
    )
}
