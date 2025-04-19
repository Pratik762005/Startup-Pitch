import React, { useState, useEffect} from 'react'
import { LuUpload } from "react-icons/lu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import avatarImg from "../assets/avatarImg.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";



const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    let navigate=useNavigate();

    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();
    
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserEmail(user.email);
    
                // Try to get displayName first
                if (user.displayName) {
                    setUserName(user.displayName);
                } else {
                    // If no displayName, get name from Firestore
                    const roles = ["Founder", "Investor"];
                    for (const role of roles) {
                        const docRef = doc(db, role, user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            setUserName(`${data.name} ${data.lastName}`);
                            break;
                        }
                    }
                }
            } else {
                setUserName(null);
                setUserEmail(null);
            }
        });
    
        return () => unsubscribe();
    }, []);
    


    return (
        <div className='flex flex-col mini-desktop:flex-row w-full items-center'>
            <div className='fixed flex gap-[1.2rem] items-center w-full top-0 py-[1rem] px-[1rem] mini-desktop:px-[2rem] z-100 bg-nav-white border-b-dash-border border-b-[2px]'>
                <div className='flex mini-desktop:hidden'>
                    <FontAwesomeIcon icon={faBars} onClick={() => setIsOpen(!isOpen)} className='text-txt-black p-[0.4rem] hover:bg-gray-200 rounded-lg cursor-pointer transition border-border border-[1px]' />
                </div>
                <h1 className='font-Medium text-[1.3rem] text-txt-black select-none'>Welcome, {userName}g!</h1>
            </div>
            <div className={`fixed top-0 left-0 h-full bg-nav-white border-r-dash-border border-r-[2px] transition-all duration-300 ease-in-out w-[70%] mobile:w-[20rem] overflow-hidden z-50 mini-desktop:fixed ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} mini-desktop:opacity-100 mini-desktop:pointer-events-auto`}>
                <div className='mt-[5.5rem] flex flex-col items-center justify-center border-b-dash-border border-b-[2px] pb-[1.2rem] px-[3rem]'>
                    <div className='flex w-[5rem] rounded-[50%] flex-col items-center justify-center'>
                        <img src={avatarImg} alt="avatar" className='h-full w-full object-cover bg-center' />
                    </div>
                    <div className='flex flex-col w-auto justify-center items-center mt-[1rem]'>
                        <h2 className='font-Medium text-txt-black text-center text-[1.1rem] line-clamp-1 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box]'>{userName}</h2>
                        <p className='font-Regular text-txt-gray-black text-center wrap-break-word line-clamp-1 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box]'>{userEmail}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[7rem] items-center px-[1rem] py-[1.3rem]'>
                    <div className='w-full'>
                        <ul className='font-Medium flex flex-col text-features gap-[0.4rem]'>
                            <li>
                                <Link to='/user/founder/profile'>
                                    <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue'>
                                        <FontAwesomeIcon icon={faUserLarge} className='' />
                                        <span className='text-[1.1rem]'>Your Profile</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/user/founder/create-pitch'>
                                    <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue'>
                                        <LuUpload />
                                        <span className='text-[1.1rem]'>Upload Pitch</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                            <Link to='/user/founder/view-pitches'>
                            <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue'>
                                    <FontAwesomeIcon icon={faChartLine} className='' />
                                    <span className='text-[1.1rem]'>View Pitch's</span>
                                </button>
                            </Link>
                               
                               
                            </li>
                           
                            <li>
                            <Link to='/user/founder/analytics'>
                            <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue'>
                                    <FontAwesomeIcon icon={faChartLine} className='' />
                                    <span className='text-[1.1rem]'>Analytics</span>
                                </button>
                            </Link> 
                            </li>
                           
                            <li>
                            <Link to='/user/founder/feedback'>
                            <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue'>
                                    <FontAwesomeIcon icon={faComment} className='' />
                                    <span className='text-[1.1rem]'>Feedback</span>
                                </button>
                            </Link>
                               
                            </li>
                        </ul>
                    </div>
                    <div className='w-full font-Medium flex flex-col text-features gap-[0.4rem]'>
                        <Link to='/user/founder/settings'>
                            <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-blue-50 hover:text-btn-blue cursor-pointer transition-all focus:bg-blue-50 focus:text-btn-blue'>
                                <FontAwesomeIcon icon={faGear} className='' />
                                <span className='text-[1.1rem]'>Settings</span>
                            </button>
                        </Link>
                        <button className='flex items-center w-full gap-[1.2rem] px-[1.5rem] py-[0.7rem] rounded-lg hover:bg-red-100 hover:text-red-400 cursor-pointer transition-all focus:bg-red-100 focus:text-red-400' onClick={async() => {
                            const auth = getAuth();
                            try {
                                navigate("/"); 
                              await signOut(auth);
                              localStorage.removeItem("email"); // optional, if you store it
                              // redirect to landing or login
                            } catch (error) {
                              console.error("Logout error:", error);
                            }
                         }}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='' />
                            <span className='text-[1.1rem]'>Log Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard