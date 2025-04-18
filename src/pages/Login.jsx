import React, { useState } from 'react'
import headLogo from "../assets/headLogo(black).png";
import googleImg from "../assets/googleImg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Login = () => {
    const handleLogIn = (e) => {
        e.preventDefault();
    }

let [email,setEmail]=useState();
let [password,setPassword]=useState();





    return (
        <div className='flex flex-col justify-center items-center px-[2rem]'>
            <div className='w-auto sm:w-[30rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]'>
                <div className='flex flex-col items-center'>
                    <img src={headLogo} alt="logo" className='w-[6rem]' />
                </div>
                <div className='flex w-full flex-col items-center'>
                    <h2 className='font-Bold text-txt-black text-center text-[1.4rem]'>Log In to NextMove</h2>
                    <p className='font-Regular text-txt-gray-black text-[1.1rem] text-center mt-[0.3rem]'>Welcome back! Please log in to continue</p>
                    <button className='flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] px-[0.4rem] py-[0.5rem] rounded-xl cursor-pointer hover:border-txt-black'>
                        <img src={googleImg} alt="google-logo" className='w-[1.4rem] mr-[0.5rem]' />
                        Continue with Google
                    </button>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <hr className='w-full mt-[2rem] text-border' />
                        <span className='font-Regular text-center text-[1.1rem] text-txt-gray-black bg-signin mt-[-0.9rem] px-[0.5rem]'>or</span>
                    </div>
                    <form onSubmit={handleLogIn} className='w-full flex flex-col justify-center items-center'>
                        <div className='flex flex-col items-start w-full font-Regular mt-[1rem]'>
                            <span className='text-[1.1rem]'>Email address</span>
                            <input type="text" placeholder='Enter your email address' className='border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black' value={email}
                            onClick={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className='flex flex-col items-start w-full font-Regular mt-[1rem]'>
                            <span className='text-[1.1rem]'>Password</span>
                            <input type="password" placeholder='Enter your password' className='border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black' />
                        </div>
                    </form>
                    <button className='font-Regular mt-[1.5rem] bg-border text-nav-white w-full py-[0.5rem] text-center rounded-lg  cursor-not-allowed transition'>
                        Continue
                        <FontAwesomeIcon icon={faCaretRight} className='ml-[0.5rem]' />
                    </button>
                    <div className='flex flex-col mt-[1rem] w-full'>
                        <span className='font-Regular text-txt-black text-center'>Don't have an account yet? <Link to='/account/signup' className='text-btn-blue hover:underline'>Sign Up</Link></span>
                        <span className='font-Regular text-[0.9rem] mt-[1rem] text-center'>
                            By continuing, you agree to NextMove's <br /><Link to='/' className='text-btn-blue hover:underline'>Terms and Condition</Link> and <Link to='/' className='text-btn-blue hover:underline'>Privacy Policy</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login