import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const [values,setValues] = useState({
        name: "",
        email: '',
        password: ""
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/register", values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate("/login")
            }
        })
        .then(err => console.log(err))
    }

    return (
        <>
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                        <input type="text" onChange={e => setValues({...values, name:e.target.value})} className="form-control" name="name" placeholder='Enter Name'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                        <input type="email"  onChange={e => setValues({...values, email:e.target.value})} className="form-control" name="email" placeholder='Enter Email'/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input type="password" onChange={e => setValues({...values, password:e.target.value})} className="form-control" name="password" placeholder='Enter Password'/>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                    <p className='form-text'>You agree to our terms and policies.</p>
                    <Link to="/login"><button className='btn btn-default border w-100 bg-light text-decoration-none'>Login</button></Link>
                </form>
            </div>
        </div>
        </>
    )
}
