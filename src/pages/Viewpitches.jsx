import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useFirebase } from '../context/firebase';
import PitchCard from '../components/PitchCard';

const Viewpitches = () => {

  const firebase = useFirebase();
  const [pitches, setpitch] = useState([]);
  
  useEffect(() => {
    firebase.listAllPitchs().then((pitch) => 
        setpitch(pitch.docs))
    console.log(pitches)
  }, []);

  const auth = getAuth();

  return (
    <div className='flex flex-col w-full'>
    
    <div className='flex flex-col w-full pb-[1.5rem]'>

    {pitches.map((pitch) => (
    <PitchCard key={pitch.id} id={pitch.id} {...pitch.data()} />
))}
        
        {/* <PitchCard />
        <PitchCard /> */}
    </div>
</div >
  )
}
export default Viewpitches