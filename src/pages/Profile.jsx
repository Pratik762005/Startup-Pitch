import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [uid, setUid] = useState(null);
  const [role, setRole] = useState("");

  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        setUserEmail(user.email);

        const roles = ["Founder", "Investor"];
        for (const r of roles) {
          const docRef = doc(db, r, user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserName(`${data.name} ${data.lastName}`);
            setAddress(data.address || "");
            setCountry(data.country || "");
            setCity(data.city || "");
            setPhone(data.phone || "");
            setRole(r);
            break;
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!uid || !role) return;

    const db = getFirestore();
    const userRef = doc(db, role, uid);
    try {
      await setDoc(userRef, {
        address,
        country,
        city,
        phone,
      }, { merge: true }); // ⬅️ This will only update these fields

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="w-full flex flex-col h-[20rem] px-[2rem] py-[1rem]">
      <div className="pb-[2rem] mt-[4.6rem] mini-desktop:ml-[20rem]">
        <h1 className="font-Bold text-txt-black text-[1.6rem]">Personal Information</h1>
        <form onSubmit={handleSaveChanges} className="mt-[1.4rem] flex flex-col bg-cream-white border-dash-border border-[2px] px-[1.5rem] py-[1.5rem] rounded-lg gap-[1.5rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">Full Name</label>
            <input value={userName} type="text" disabled className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]" />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">Email</label>
            <input value={userEmail} type="text" disabled className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]" />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter your address" className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]" />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]">
              <option value="">Choose a country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter your city" className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]" />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">Phone (with country code)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Enter your phone number" className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]" />
          </div>

          <button className="font-Regular text-nav-white bg-btn-blue py-[0.4rem] text-[1.1rem] rounded-lg cursor-pointer hover:bg-hover-blue transition-all">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
