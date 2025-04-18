import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import { Route, Routes, useLocation,useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import UploadPitch from './pages/UploadPitch'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import FindPitches from './pages/FindPitches'
import SavedPitches from './pages/SavedPitches'
import PitchDetails from './pages/PitchDetails'
import Otp_verification from './pages/Otp_verification'
import { useEffect } from 'react'

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/user/");
  const hideFooter = location.pathname.startsWith("/user/");
  const showDashboard = location.pathname.startsWith("/user/");
  const navigate=useNavigate();


  useEffect(()=>{
    let email=localStorage.getItem("email");
    console.log(email);
      if(email!=null){
          setTimeout(()=>{
            navigate("/user/founder/profile");
          },5000)
      }
  },[navigate])


  return (
    <div className='min-h-screen flex flex-col bg-nav-white'>
      {!hideNavbar &&
        <header>
          <Navbar />
        </header>
      }
      {showDashboard &&
        <Dashboard />
      }
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/signup' element={<Signup />} />
          <Route path='/user/founder/profile' element={<Profile />} />
          <Route path='/user/founder/create-pitch' element={<UploadPitch />} />
          <Route path='/user/founder/settings' element={<Settings />} />
          <Route path='/user/investor/find-pitches' element={<FindPitches />} />
          <Route path='/user/investor/find-pitches/pitch-id-11' element={<PitchDetails />} />
          <Route path='/user/investor/saved-pitches' element={<SavedPitches />} />
          <Route path='/account/otp_verification' element={<Otp_verification />} />
        </Routes>
      </main>
      {!hideFooter &&
        <footer>
          <Footer />
        </footer>
      }
    </div>
  )
}

export default App