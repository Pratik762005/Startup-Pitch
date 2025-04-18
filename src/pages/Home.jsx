import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
import HeroSec from '../components/HeroSec'
import tempImg from "../assets/tempImg.jpg";
import uploadPitchImg from "../assets/uploadPitchImg.png";
import realTimeImg from "../assets/realTimeImg.png";
import feedbackImg from "../assets/feedbackImg.png";
import connectionImg from "../assets/connectionImg.png";
import secureImg from "../assets/secureImg.png";
import founderImg from "../assets/founderImg.png";
import investorImg from "../assets/investorImg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Home = () => {
    const sectionRef = useRef(null);

    return (
        <div className='flex flex-col items-center justify-center'>
            <HeroSec sectionRef={sectionRef} />
            <div className='bg-cream-white w-full flex flex-col items-center py-[3rem] px-[3rem] lg:px-[4rem] xl:px-[8rem]'>
                <h2 className='font-Bold text-txt-black text-[2rem] lg:text-[2.3rem]'>How it works</h2>
                <div className='flex flex-col gap-[2rem] justify-center items-center mt-[1rem]'>
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className='w-full flex flex-col sm:flex-row-reverse sm:gap-[3rem] mt-[1.5rem] sm:mt-[3rem] xl:mt-[3.5rem]'
                    >
                        <div className='flex flex-col gap-[3rem] w-full sm:gap-[5rem]'>
                            <div className='flex flex-col sm:flex-row-reverse w-full sm:gap-[3rem]'>
                                <div className='w-[85%] xl:w-[45%] sm:w-[45%] glow-border p-[4px] relative'>
                                    <img src={uploadPitchImg} alt="step-3 img" className='w-full h-full object-fill rounded-[0.5rem] mb-[1rem]' />
                                </div>
                                <div className='flex flex-col sm:w-[55%] xl:w-[55%]'>
                                    <span className='font-Light tablet:text-[1.2rem] xl:text-[1.3rem] text-[1.1rem] text-txt-gray-black'>Step 1</span>
                                    <h2 className='font-Bold mini-desktop:text-[1.8rem] tablet:text-[1.6rem] xl:text-[2rem] text-[1.5rem] text-txt-black leading-[2rem] mt-[0.4rem]'>Upload Your Pitch</h2>
                                    <span className='font-Medium text-txt-gray-black tablet:text-[1.1rem] xl:text-[1.3rem] mt-[0.4rem]'>Share your startup deck, video, or idea with ease.</span>
                                </div>
                            </div>
                            <div className='flex flex-col sm:text-end sm:flex-row w-full sm:gap-[3rem]'>
                                <div className='w-[85%] xl:w-[45%] sm:w-[45%]'>
                                    <img src={tempImg} alt="step-3 img" className='w-full h-full object-cover rounded-3xl mb-[1rem]' />
                                </div>
                                <div className='flex flex-col sm:w-[55%] xl:w-[55%]'>
                                    <span className='font-Light tablet:text-[1.2rem] xl:text-[1.3rem] text-[1.1rem] text-txt-gray-black'>Step 2</span>
                                    <h2 className='font-Bold  tablet:text-[1.6rem] xl:text-[2rem] text-[1.5rem] text-txt-black leading-[2rem] mt-[0.4rem]'>Get Matched with Mentors and Investors</h2>
                                    <span className='font-Medium text-txt-gray-black tablet:text-[1.1rem] xl:text-[1.3rem] mt-[0.4rem]'>Receive feedback from those who matter most.</span>
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row-reverse w-full sm:gap-[3rem]'>
                                <div className='w-[85%] xl:w-[45%] sm:w-[45%]'>
                                    <img src={tempImg} alt="step-3 img" className='w-full h-full object-cover rounded-3xl mb-[1rem]' />
                                </div>
                                <div className='flex flex-col sm:w-[55%] xl:w-[55%]'>
                                    <span className='font-Light tablet:text-[1.2rem] xl:text-[1.3rem] text-[1.1rem] text-txt-gray-black'>Step 3</span>
                                    <h2 className='font-Bold mini-desktop:text-[1.8rem] tablet:text-[1.6rem] xl:text-[2rem] text-[1.5rem] text-txt-black leading-[2rem] mt-[0.4rem]'>Track Your Growth</h2>
                                    <span className='font-Medium text-txt-gray-black tablet:text-[1.1rem] xl:text-[1.3rem] mt-[0.4rem]'>Analyze views, responses, and engagement in one dashboard.</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='bg-nav-white w-full flex flex-col items-center py-[3rem] px-[3rem] lg:px-[4rem] xl:px-[12rem]'>
                <h2 className='font-Bold text-txt-black text-[2rem]'>Why NextMove?</h2>
                <div className='flex flex-col justify-center items-center w-full gap-[2rem] mt-[4rem]'>
                    <div className='flex flex-col w-full mini-desktop:flex-row gap-[2rem]'>
                        <div className='flex flex-col w-full gap-[0.5rem] bg-cream-white py-[1.5rem] px-[1.2rem] rounded-3xl shadow-md'>
                            <img src={realTimeImg} className='w-[2rem]' />
                            <h2 className='font-Medium text-txt-black text-[1.2rem] mt-[0.5rem]'>Real-Time Pitch Stats</h2>
                            <span className='font-Medium text-txt-gray-black text-[1rem]'>Track views, comments, and ratings in one clean dashboard.</span>
                        </div>
                        <div className='flex flex-col w-full gap-[0.5rem] bg-cream-white py-[1.5rem] px-[1.2rem] rounded-3xl shadow-md'>
                            <img src={feedbackImg} className='w-[2rem]' />
                            <h2 className='font-Medium text-txt-black text-[1.2rem] mt-[0.5rem]'>Expert Feedback</h2>
                            <span className='font-Medium text-txt-gray-black text-[1rem]'>Investors & mentors share structured, actionable feedback.</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-full mini-desktop:flex-row gap-[2rem]'>
                        <div className='flex flex-col w-full gap-[0.5rem] bg-cream-white py-[1.5rem] px-[1.2rem] rounded-3xl shadow-md'>
                            <img src={connectionImg} className='w-[2rem]' />
                            <h2 className='font-Medium text-txt-black text-[1.2rem] mt-[0.5rem]'>Direct Connections</h2>
                            <span className='font-Medium text-txt-gray-black text-[1rem]'>Skip the noise. Get directly in front of those who can help.</span>
                        </div>
                        <div className='flex flex-col w-full gap-[0.5rem] bg-cream-white py-[1.5rem] px-[1.2rem] rounded-3xl shadow-md'>
                            <img src={secureImg} className='w-[2rem]' />
                            <h2 className='font-Medium text-txt-black text-[1.2rem] mt-[0.5rem]'>Private and Secure</h2>
                            <span className='font-Medium text-txt-gray-black text-[1rem]'>Your data are always protected.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full' ref={sectionRef}>
                <div className='bg-cream-white w-full text-center flex flex-col items-center py-[3rem] px-[3rem] lg:px-[4rem] xl:px-[12rem]'>
                    <h2 className='font-Bold text-txt-black text-[2rem]'>A Platform for Both Sides of the Table</h2>
                    <div className='flex flex-col mini-desktop:flex-row mini-desktop:gap-[2rem]'>
                      
                        <Link to='/account/signup' >
                            <button className='flex flex-col gap-[1.5rem] mt-[3rem] bg-cream-white px-[1.5rem] py-[1rem] border-border border-[2px] rounded-2xl cursor-pointer hover:border-txt-black focus:border-txt-black transition'onClick={()=>{sessionStorage.setItem("choice","Sign Up as a Founder")}}>
                                <div className='flex justify-between items-center'>
                                    <img src={founderImg} alt="founder-img" className='w-[3rem]' />
                                </div>
                                <div className='flex flex-col items-start gap-[0.5rem]'>
                                    <h2 className='font-Bold text-txt-black text-[1.2rem]'>For Founders</h2>
                                    <span className='font-Medium text-txt-gray-black text-left'>Raise visibility, validate your pitch, refine your product.</span>
                                </div>
                            </button>
                        </Link>
                        <Link to='/account/signup' >
                            <button className='flex flex-col gap-[1.5rem] mt-[3rem] bg-cream-white px-[1.5rem] py-[1rem] border-border border-[2px] rounded-2xl cursor-pointer hover:border-txt-black focus:border-txt-black transition' 
                            onClick={()=>{sessionStorage.setItem("choice","Sign Up as an Investor")}}>
                                <div className='flex justify-between items-center'>
                                    <img src={investorImg} alt="founder-img" className='w-[3rem]' />
                                </div>
                                <div className='flex flex-col items-start gap-[0.5rem]'>
                                    <h2 className='font-Bold text-txt-black text-[1.2rem]'>For Investors</h2>
                                    <span className='font-Medium text-txt-gray-black text-left'>Discover startups aligned with your values and interests.</span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home