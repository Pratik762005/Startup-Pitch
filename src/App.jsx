// Cleaned-up App.jsx
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from './context/firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadPitch from './pages/UploadPitch';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import FindPitches from './pages/FindPitches';
import SavedPitches from './pages/SavedPitches';
import PitchDetails from './pages/PitchDetails';
import Otp_verification from './pages/Otp_verification';

const App = () => {
  const firebase = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

  const isUserRoute = location.pathname.startsWith("/user/");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setTimeout(() => {
        navigate("/user/founder/profile");
      }, 3000);
    }
  }, [navigate]);

  return (
    <div className='min-h-screen flex flex-col bg-nav-white'>
      {!isUserRoute && <Navbar />}
      {isUserRoute && <Dashboard />}

      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/signup' element={<Signup />} />
          <Route path='/account/otp_verification' element={<Otp_verification />} />

          {/* Founder routes */}
          <Route path='/user/founder/profile' element={<Profile />} />
          <Route path='/user/founder/create-pitch' element={<UploadPitch />} />
          <Route path='/user/founder/settings' element={<Settings />} />

          {/* Investor routes */}
          <Route path='/user/investor/find-pitches' element={<FindPitches />} />
          <Route path='/user/investor/find-pitches/pitch-id-11' element={<PitchDetails />} />
          <Route path='/user/investor/saved-pitches' element={<SavedPitches />} />
        </Routes>
      </main>

      {!isUserRoute && <Footer />}
    </div>
  );
};

export default App;
