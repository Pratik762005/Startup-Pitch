import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import headLogo from "../assets/headLogo(black).png";
import { Link } from 'react-router-dom';




const Otp_verification = () => {

let [condition,setCondition]=useState("");
let [otpSent,setOtpSent]=useState("Send Otp");
let [counter,setCounter]=useState(0);
let [otp1,setOtp1]=useState(null);
let [mainline,setMainline]=useState("Verify OTP!!")
let [autoLogin,setAutoLogin]=useState("");

let [firstDigit,setFirstDigit]=useState("")
let [secondDigit,setSecondDigit]=useState("")
let [thirdDigit,setThirdDigit]=useState("")
let [fourthDigit,setFourthDigit]=useState("")
let [fifthDigit,setFifthDigit]=useState("")
let [sixthDigit,setSixthDigit]=useState("")


function sendotp(){
  setCondition("Trying to Send....")
        // Step 1: Get form object from localStorage
        let email = "";

        try {
          const savedForm = localStorage.getItem("form");
          if (!savedForm) {
            setCondition("Form not found in localStorage.");
            return;
          }

          const formData = JSON.parse(savedForm);
        
          email = formData.email1;
          setAutoLogin(email);
          console.log(autoLogin);

          if (!email) {
            setCondition("Email not found in form.");
            return;
          }
        } catch (e) {
          console.error("JSON parse error:", e);
          setCondition("Invalid form data.");
          return;
        }

        // Step 2: Check EmailJS via CDN
        if (!window.emailjs) {
          setCondition("EmailJS not loaded.");
          return;
        }

        window.emailjs.init('PNgXxZA71sWtcQHbm'); // Your public key

        // Step 3: Generate OTP
        let otp = Math.floor(100000 + Math.random() * 900000);
        setOtp1(otp);
        console.log("Generated OTP:", otp);
        const currentTime = new Date().toLocaleTimeString();
        // Step 4: Create form and append inputs
        const form = document.createElement("form");

        const otpInput = document.createElement("input");
        otpInput.type = "hidden";
        otpInput.name = "passcode";
        otpInput.value = otp;
        form.appendChild(otpInput);

        const timeInput = document.createElement("input");
        timeInput.type = "hidden";
        timeInput.name = "time";
        timeInput.value = currentTime;
        form.appendChild(timeInput);

        const emailInput = document.createElement("input");
        emailInput.type = "hidden";
        emailInput.name = "user_email";
        emailInput.value = email;
        form.appendChild(emailInput);

        // Step 5: Send email using EmailJS
        window.emailjs.sendForm("service_3jx715u", "template_o6jxdkh", form)
          .then(() => {
            setCondition("Otp Sent Successfully!!");
            setCounter((prevCounter) => prevCounter + 1);
            setOtpSent("verify Otp")
          })
          .catch((error) => {
            setCounter(null);
            setCondition("Failed to Send OTP");
          });
return otp;
}

function checkotp(){

otp1=""+otp1;

    if(firstDigit==otp1[0]&&secondDigit==otp1[1]&&thirdDigit==otp1[2]&&fourthDigit==otp1[3]&&fifthDigit==otp1[4]&&sixthDigit==otp1[5]){
     setCounter(null);
      setMainline("Otp Verified!!");
    }
}


  return (
  
    <div className='w-[25rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]'>
    
      <Link to='/account/signup' >
          <FontAwesomeIcon icon={faArrowLeft} beat className='relative bottom-2 right-43'/>
      </Link>
    
      <div className='flex flex-col items-center'>
        <img src={headLogo} alt="logo" className='w-[6rem]' />
      </div>
      <h2 className='text-3xl text-[#4B4D4F]'>{mainline}</h2>
      <h3 className={` text-[12px] font-[600] ${condition=="Otp Sent Successfully!!"?"text-green-400":"text-red-500"}`}>{condition}</h3>
   
      {(counter!=0 &&counter!=null)&& 
        <div className='w-full h-fit flex justify-evenly items-center flex-row p-2.5 my-7'>
          <input type="text" className='bg-gray-200 h-[40px] w-[40px] rounded-lg text-center text-2xl' required maxLength={1} value={firstDigit} onChange={(e)=>{setFirstDigit(e.target.value)}}/>
          <input type="text" className='bg-gray-200 h-[40px] w-[40px] rounded-lg text-center text-2xl' required maxLength={1} value={secondDigit} onChange={(e)=>{setSecondDigit(e.target.value)}}/>
          <input type="text" className='bg-gray-200 h-[40px] w-[40px] rounded-lg text-center text-2xl' required maxLength={1} value={thirdDigit} onChange={(e)=>{setThirdDigit(e.target.value)}}/>
          <input type="text" className='bg-gray-200 h-[40px] w-[40px] rounded-lg text-center text-2xl' required maxLength={1} value={fourthDigit} onChange={(e)=>{setFourthDigit(e.target.value)}}/>
          <input type="text" className='bg-gray-200 h-[40px] w-[40px] rounded-lg text-center text-2xl' required maxLength={1} value={fifthDigit} onChange={(e)=>{setFifthDigit(e.target.value)}}/>
          <input type="text" className='bg-gray-200 h-[40px] w-[40px] rounded-lg text-center text-2xl' required maxLength={1} value={sixthDigit} onChange={(e)=>{setSixthDigit(e.target.value)}}/>
        </div>
    }
     <button className={`px-5 py-2 bg-[#A7A6A6] rounded-4xl border-2-transparent hover:border-2-black mt-4 cursor-pointer ${counter!=null?"flex":"hidden"}`} onClick={()=>otpSent=="Send Otp"?sendotp():checkotp()} >{otpSent}</button>

    <Link to={condition=="Otp Sent Successfully!!"?`/user/founder/profile`:`/account/signup`}>
            <button className={`px-5 py-2 bg-[#A7A6A6] rounded-4xl border-2-transparent hover:border-2-black mt-4 cursor-pointer ${condition=="Loading...."?"cursor-not-allowed":"cursor-pointer"} ${counter==null?'flex':'hidden'}`} onClick={()=>{localStorage.setItem("email",autoLogin)}}>{condition=="Otp Sent Successfully!!"?'Continue':'Return to Signup'}</button>
    </Link>
    </div>
  )
}

export default Otp_verification