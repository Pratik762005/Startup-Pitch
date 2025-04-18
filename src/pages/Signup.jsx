import React, { useEffect,useState } from 'react'
import headLogo from "../assets/headLogo(black).png";
import googleImg from "../assets/googleImg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Signup = () => {
  const [role, setRole] = useState('Select a role')


  let [name,setName]=useState("");
  let [lastName,setLastName]=useState("");
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [signupCondition,setSignupCondition]=useState(false);
  
  
  useEffect(()=>{
    if(name!="" && lastName!="" && email.endsWith("@gmail.com") && password.length>=6 && role!="Select a role"){
      setSignupCondition(true);
    }
    else{
      setSignupCondition(false);
    }
  },[role,email,password,name,lastName])
  
  
  const formData=()=>{
  let form={
    email1:email,
    name1:name,
    lastName1:lastName,
    password1:password
  }
    localStorage.setItem("form",JSON.stringify(form));
  }
  
    useEffect(()=>{
      let choice=sessionStorage.getItem("choice");
      console.log(choice);
      setRole(choice);
     
    },[])
  
  



  const handleLogIn = (e) => {
    e.preventDefault();
  }

  return (
    <div className='flex flex-col justify-center items-center px-[2rem]'>
      <div className='w-auto sm:w-[30rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]'>
        <div className='flex flex-col items-center'>
          <img src={headLogo} alt="logo" className='w-[6rem]' />
        </div>
        <div className='flex w-full flex-col items-center'>
          <h2 className='font-Bold text-txt-black text-center w-full text-[1.4rem]'>Join NextMove Now!</h2>
          <p className='font-Regular w-full text-txt-gray-black text-[1.1rem] text-center mt-[0.3rem]'>Sign Up as a Founder or an Investor</p>
          <div className='flex w-full gap-[0.5rem]'>
            <button
              className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.9rem] rounded-xl cursor-pointer hover:border-txt-black ${role=="Sign Up as a Founder"?"bg-btn-blue text-nav-white border-btn-blue":""}`}
              onClick={() => setRole('Sign Up as a Founder')}
            >Join as a Founder</button>
            <button
              className={`flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.9rem] rounded-xl cursor-pointer hover:border-txt-black ${role=="Sign Up as an Investor"?"bg-btn-blue text-nav-white border-btn-blue":""}`}
              onClick={() => setRole('Sign Up as an Investor')}
            >Join as an Investor</button>
          </div>
          <button className='flex w-full justify-center items-center mt-[1.5rem] font-Regular text-txt-gray-black border-border border-[1px] py-[0.5rem] px-[0.4rem] rounded-xl cursor-pointer hover:border-txt-black'>
            <img src={googleImg} alt="google-logo" className='w-[1.4rem] mr-[0.5rem]' />
            Continue with Google
          </button>
          <div className='w-full flex flex-col justify-center items-center'>
            <hr className='w-full mt-[2rem] text-border' />
            <span className='font-Regular text-center text-[1.1rem] text-txt-gray-black bg-signin mt-[-0.9rem] px-[0.5rem]'>or</span>
          </div>
          <form onSubmit={handleLogIn} className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col items-start w-full font-Regular mt-[1rem]'>
              <span className='text-[1.1rem]'>First Name</span>
              <input type="text" placeholder='Enter your first name' required value={name} onChange={(e)=>{setName(e.target.value)}}className='border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black' />
            </div>
            <div className='flex flex-col items-start w-full font-Regular mt-[1rem]'>
              <span className='text-[1.1rem]'>Last Name</span>
              <input type="text" placeholder='Enter your last name' required value={lastName} onChange={(e)=>{setLastName(e.target.value)}}className='border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black' />
            </div>
            <div className='flex flex-col items-start w-full font-Regular mt-[1rem]'>
              <span className='text-[1.1rem]'>Email address</span>
              <input type="text" placeholder='Enter your email address' required value={email} onChange={(e)=>{setEmail(e.target.value)}}className='border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black' />
            </div>
            <div className='flex flex-col items-start w-full font-Regular mt-[1rem]'>
              <span className='text-[1.1rem]'>Password</span>
              <input type="password" placeholder='Enter your password' required value={password} onChange={(e)=>{setPassword(e.target.value)}}className='border-border w-full border-[1px] mt-[0.5rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black' />
            </div> 
          </form>
          <Link to={signupCondition==true?`/account/otp_verification`:`/account/signup`} className='font-Medium'>
              <button className={`font-Regular mt-[1.5rem] bg-border text-nav-white w-full py-[0.5rem] text-center rounded-lg ${signupCondition==true?"cursor-pointer":"cursor-not-allowed"} transition`} type='submit' onClick={formData}>
                {role}
                <FontAwesomeIcon icon={faCaretRight} className='ml-[0.5rem]' />
              </button>    
        </Link>
          <div className='flex flex-col mt-[1rem] w-full'>
            <span className='font-Regular text-txt-black text-center'>Already have an account? <Link to='/account/login' className='text-btn-blue hover:underline'>Log In</Link></span>
            <span className='font-Regular text-[0.9rem] mt-[1rem] text-center'>
              By continuing, you agree to NextMove's <br /><Link to='/' className='text-btn-blue hover:underline'>Terms and Condition</Link> and <Link to='/' className='text-btn-blue hover:underline'>Privacy Policy</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup