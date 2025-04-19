// Refactored Otp_verification.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import headLogo from "../assets/headLogo(black).png";
import { Link, useNavigate } from 'react-router-dom';
import { signupUserWithEmailAndPassword } from '../context/firebase';

const Otp_verification = () => {
  const navigate = useNavigate();

  const [condition, setCondition] = useState("");
  const [otpSent, setOtpSent] = useState("Send Otp");
  const [counter, setCounter] = useState(0);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [mainline, setMainline] = useState("Verify OTP!!");

  const sendOtp = () => {
    setCondition("Trying to send...");

    try {
      const savedForm = localStorage.getItem("form");
      if (!savedForm) throw new Error("Form not found");

      const { email1 } = JSON.parse(savedForm);
      if (!email1) throw new Error("Email not found in form");

      if (!window.emailjs) throw new Error("EmailJS not loaded");
      window.emailjs.init('PNgXxZA71sWtcQHbm');

      const generated = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(generated);

      const form = document.createElement("form");
      [
        { name: "passcode", value: generated },
        { name: "time", value: new Date().toLocaleTimeString() },
        { name: "user_email", value: email1 }
      ].forEach(({ name, value }) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      window.emailjs.sendForm("service_3jx715u", "template_o6jxdkh", form)
        .then(() => {
          setCondition("Otp Sent Successfully!!");
          setCounter(prev => prev + 1);
          setOtpSent("Verify Otp");
        })
        .catch(() => setCondition("Failed to send OTP"));
    } catch (e) {
      console.error("OTP Error:", e);
      setCondition(e.message);
    }
  };

  const checkOtp = () => {
    if (otp === String(generatedOtp)) {
      setCounter(null);
      setMainline("OTP Verified!!");

      try {
        const { email1, password1, name1, lastName1 } = JSON.parse(localStorage.getItem("form"));
        signupUserWithEmailAndPassword(email1, password1, name1, lastName1, navigate);
      } catch (error) {
        console.error("Signup after OTP error:", error);
        alert("Something went wrong.");
      }
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className='w-[25rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2.5rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]'>
      <Link to='/account/signup'>
        <FontAwesomeIcon icon={faArrowLeft} className='relative bottom-2 right-43' />
      </Link>
      <div className='flex flex-col items-center'>
        <img src={headLogo} alt="logo" className='w-[6rem]' />
      </div>
      <h2 className='text-3xl text-[#4B4D4F]'>{mainline}</h2>
      <h3 className={`text-[12px] font-[600] ${condition.includes("Successfully") ? "text-green-400" : "text-red-500"}`}>{condition}</h3>

      {counter !== 0 && counter !== null && (
        <input
          type="text"
          className='text-center tracking-widest bg-gray-200 rounded-lg p-2 my-5 text-xl w-full'
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}

      <button
        className='px-5 py-2 bg-[#A7A6A6] rounded-4xl border-2-transparent hover:border-2-black mt-4 cursor-pointer'
        onClick={otpSent === "Send Otp" ? sendOtp : checkOtp}
      >
        {otpSent}
      </button>

      <Link to={condition === "Otp Sent Successfully!!" ? `/user/founder/profile` : `/account/signup`}>
        <button
          className={`px-5 py-2 bg-[#A7A6A6] rounded-4xl hover:border-2-black mt-4 ${counter === null ? 'flex' : 'hidden'}`}
          onClick={() => localStorage.setItem("email", JSON.parse(localStorage.getItem("form"))?.email1)}>
          {condition === "Otp Sent Successfully!!" ? 'Continue' : 'Return to Signup'}
        </button>
      </Link>
    </div>
  );
};

export default Otp_verification;
