import React ,{ useState} from 'react'
import {useFirebase, } from '../context/firebase'

const UploadPitch = () => {

    const firebase = useFirebase();
    
    const [pitchTitle,setpitchTitle ] = useState('');
    const [pitchDetails, setpitchDetails] = useState('');
    const [category, setcategory] = useState('');
    const [fundinggoles, setfundinggoles] = useState('');
    const [usetags, setusetags] = useState('');


    

    
    const handlePitchSubmit = async (e) => {
        e.preventDefault();
        await firebase.handleCreateNewPitch(
            pitchTitle,
            pitchDetails,
            category,
            fundinggoles,
            usetags
        )
    }

    return (
        <div className='w-full flex flex-col px-[2rem] py-[1rem] h-[20rem]'>
            <div className='mt-[4.6rem] pb-[2rem] mini-desktop:ml-[20rem]'>
                <h1 className='font-Bold text-txt-black text-[1.6rem]'>Create a new Pitch Deck</h1>
                <form onSubmit={handlePitchSubmit} className='mt-[1.4rem] flex flex-col bg-cream-white border-dash-border border-[2px] px-[1.5rem] py-[1.5rem] rounded-lg gap-[1.5rem]'>
                    <div className='flex flex-col gap-[0.5rem]'>
                        <label className='font-Medium text-txt-black text-[1.2rem]'>Pitch Title</label>
                        <input onChange={e => setpitchTitle(e.target.value)} value={pitchTitle} type="text" placeholder='Enter a pitch title' className='w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]' />
                    </div>
                    <div className='flex flex-col gap-[0.5rem]'>
                        <label className='font-Medium text-txt-black text-[1.2rem]'>Pitch Details</label>
                        <textarea onChange={e => setpitchDetails(e.target.value)} value={pitchDetails} type="" placeholder='Describe your pitch...' className='w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.6rem] h-[10rem] border-border border-[2px] resize-none' />
                    </div>
                    <div className='flex flex-col gap-[0.5rem]'>
                        <label className='font-Medium text-txt-black text-[1.2rem]'>Upload File</label>
                        <input  type="file" className='w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px] cursor-pointer' />
                    </div>
                    <div className='flex flex-col gap-[0.5rem]'>
                        <label className='font-Medium text-txt-black text-[1.2rem]'>Pitch Category</label>
                        <select onChange={e => setcategory(e.target.value)} value={category} className='w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]'>
                            <option value="Choose a category">Choose a category</option>
                            <option value="tech">Tech</option>
                            <option value="medical">Medical</option>
                            <option value="Choose a category">Choose a category</option>
                            <option value="Choose a category">Choose a category</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-[0.5rem]'>
                        <label className='font-Medium text-txt-black text-[1.2rem]'>Funding Goal ($)</label>
                        <input onChange={e => setfundinggoles(e.target.value)} value={fundinggoles} type="number" min="0" className='w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]' />
                    </div>
                    <div className='flex flex-col gap-[0.5rem]'>
                        <label className='font-Medium text-txt-black text-[1.2rem]'>Tags (comma-separated)</label>
                        <input onChange={e => setusetags(e.target.value)} value={usetags} type="text" placeholder='e.g. AI, Startup, Tech' className='w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]' />
                    </div>
                    <button type='onSubmit' 
                    className='font-Regular text-nav-white bg-btn-blue py-[0.4rem] text-[1.1rem] rounded-lg cursor-pointer hover:bg-hover-blue transition-all'>
                        Create Pitch
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadPitch