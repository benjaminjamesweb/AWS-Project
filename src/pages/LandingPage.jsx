import React, { useState } from 'react'
import './styles/LandingPage.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState("login")

    return (
        <div>
            <h1>Anglophoria</h1>

            <div>
                <p>
                    Welcome to Anglophoria. 
                    This is a website for learning English. 
                    <button onClick={() => navigate('/')}>Go to homepage</button>
                </p>
            </div>

            {form === "login" ? (
                <div className='form-container'>
                    <div className='form-div'>
                    <div className='buttons-div'>
                        <button onClick={() => setForm("login")} className={`${form === "login" ? 'selected' : 'unselected'} login-button`}>Log in</button>
                        <button onClick={() => setForm("signup")} className={`${form === "signup" ? 'selected' : 'unselected'} signup-button`}>Sign up</button>
                    </div>


                        <h1>Welcome back!</h1>

                        <div className='fields-div'>

                            <label>Email</label>
                            <input type="email" id="email"/>

                            <label>Password</label>
                            <input type="password" id="password"/>
                        </div>

                        <button>Log in</button>
                    </div>
                </div>
            ) : (
                <div className='form-container'>
                <div className='form-div'>
                <div className='buttons-div'>
                    <button onClick={() => setForm("login")} className={`${form === "login" ? 'selected' : 'unselected'} login-button`}>Log in</button>
                    <button onClick={() => setForm("signup")} className={`${form === "signup" ? 'selected' : 'unselected'} signup-button`}>Sign up</button>
                </div>


                    <h1>Create your account!</h1>

                    <div className='fields-div'>

                        <label>Email</label>
                        <input type="email" id="email"/>

                        <label>Password</label>
                        <input type="password" id="password"/>

                        <label>Confirm Password</label>
                        <input type="password" id="password"/>

                    </div>

                    <button>Sign up</button>
                </div>
             </div>
            )}

        </div>
    )
}

export default LandingPage