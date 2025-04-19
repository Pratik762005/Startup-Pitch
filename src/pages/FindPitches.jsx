import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PitchCard from '../components/PitchCard'
import { useFirebase } from '../context/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom'

const FindPitches = () => {
    
    console.log(props);
    return (
        <div className='flex flex-col w-full'>
            <div className='w-full mini-desktop:w-auto px-[1.5rem] py-[1rem] mt-[4.6rem] mini-desktop:ml-[20rem]'>
                <h1 className='font-Medium text-txt-black text-[1.4rem]'>Pitches you might like</h1>
                <input type="text" placeholder='Search for pitches...' className='w-full font-Regular text-txt-black px-[0.7rem] py-[0.7rem] border-border border-[1.5px] rounded-lg mt-[1rem]' />
                <FontAwesomeIcon icon={faSearch} className='absolute bg-btn-blue mt-[1.35rem] text-[1.2rem] py-[0.55rem] px-[0.6rem] ml-[-2.8rem] rounded-lg text-nav-white cursor-pointer hover:bg-hover-blue transition-all' />
            </div>
            <div className='flex flex-col w-full pb-[1.5rem]'>
                <PitchCard />
                <PitchCard />
                <PitchCard />
            </div>
        </div >
    )
}

export default FindPitches