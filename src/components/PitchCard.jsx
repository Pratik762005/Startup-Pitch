import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PitchCard = (props) => {
    console.log(props)
    return (
        <div className='flex flex-col w-full'>
            <div className='w-full mini-desktop:w-auto px-[1.5rem] mini-desktop:ml-[20rem]'>
                <Link to='/user/investor/find-pitches/pitch-id-11'>
                    <div className='hover:bg-dash-border px-[1.2rem] py-[1.4rem] cursor-pointer rounded-md'>
                        <div className='flex items-center justify-between'>
                            <span className='font-Medium text-[1rem] bg-blue-50 border-btn-blue border-[1px] px-[0.8rem] py-[0.4rem] rounded-xl text-txt-black'>{props.tags }</span>
                            <FontAwesomeIcon icon={faHeartRegular} className='absolute right-[3.5rem] text-[1.3rem] text-txt-black' />
                        </div>
                        <h2 className='font-Regular text-btn-blue text-[1.2rem] line-clamp-2 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box] mt-[1rem]'>{ props.pitch}</h2>
                        <p className='font-Light text-txt-gray-black text-[1.05rem] line-clamp-3 overflow-hidden [-webkit-box-orient:vertical] [display:-webkit-box] mt-[0.8rem] mb-[2rem]'>{ props.PitchDetails}</p>
                        <div className='flex justify-between gap-[1rem] items-center'>
                            <span className='font-Regular text-txt-gray-black'>Proposed Funding($): { props.funding_goal} <span className='text-txt-black'></span></span>
                            <div className='flex gap-[0.3rem]'>
                                <FontAwesomeIcon icon={faStar} className='text-btn-blue' />
                                <FontAwesomeIcon icon={faStar} className='text-btn-blue' />
                                <FontAwesomeIcon icon={faStar} className='text-btn-blue' />
                                <FontAwesomeIcon icon={faStar} className='text-btn-blue' />
                                <FontAwesomeIcon icon={faStar} className='text-border' />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PitchCard