import { createContext, useContext,  useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithRedirect
} from "firebase/auth";
import { getFirestore, 
  doc,
   getDoc, setDoc, 
   collection, addDoc,
    getDocs, query, where } from "firebase/firestore";



// Removed duplicate declaration of useFirebase


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDNb1aS2ZBTHeWftOSdeHcPZyb149KrHEk",
  authDomain: "startup-pitch-portal.firebaseapp.com",
  projectId: "startup-pitch-portal",
  storageBucket: "startup-pitch-portal.appspot.com",
  messagingSenderId: "428561967266",
  appId: "1:428561967266:web:f173dec8cfee0f8286cffb",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {
 const [user, setUser] = useState(null);

useEffect(() => {
  onAuthStateChanged(auth, user => {
    if (user) setUser(user);
    else setUser(null)
    
    });
}, [])

const [loading, setLoading] = useState(true);

useEffect(() => {
onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user);
  } else {
    setUser(null);
  }
  setLoading(false); // ⬅️ auth status resolved
});
}, []);




const signupUserWithEmailAndPassword = async (email, password, name, lastName,) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${name} ${lastName}`
    });

    const role = JSON.parse(localStorage.getItem("form"))?.role1;
    if (!role) {
      alert("Please select a role before signing up.");
      return;
    }

    const userRef = doc(firestore, role, user.uid);
    const userData = {
      uid: user.uid,
      email,
      name,
      lastName,
      role,
      createdAt: new Date().toISOString(),
      provider: "email",
      password
    };

    await setDoc(userRef, userData);
    alert("Signup successful!");
    navigate("/account/signup");
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
};
// export { signupUserWithEmailAndPassword };

const signinUserWithEmailAndPass = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

const signupWithGoogle = async (navigate, role) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!role) {
      alert("Role not specified.");
      return;
    }

    // Check if this Gmail is already registered under *either* role
    const founderRef = doc(firestore, "Founder", user.uid);
    const investorRef = doc(firestore, "Investor", user.uid);

    const [founderSnap, investorSnap] = await Promise.all([
      getDoc(founderRef),
      getDoc(investorRef),
    ]);

    if (
      (role === "Founder" && investorSnap.exists()) ||
      (role === "Investor" && founderSnap.exists())
    ) {
      alert(
        `This Gmail is already registered as a ${role === "Founder" ? "Investor" : "Founder"}. Please log in instead.`
      );
      await signOut(auth);
      return;
    }

    // Proceed only if NOT already registered
    const roleRef = doc(firestore, role, user.uid);
    const roleSnap = await getDoc(roleRef);

    if (roleSnap.exists()) {
      alert("You already have an account.");
      navigate("/");
    } else {
      const nameParts = user.displayName?.split(" ") || [];
      const userData = {
        uid: user.uid,
        email: user.email,
        name: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        photoURL: user.photoURL,
        role: role,
        createdAt: new Date().toISOString(),
        provider: "google",
      };

      await setDoc(roleRef, userData);
      alert("Signup successful!");
      navigate(`/user/${role.toLowerCase()}/profile`);
    }
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      alert('Please allow popups from this website to complete the Google signin process.');
    } else {
      console.error('Google Signup Error:', error);
      alert('Something went wrong during Google signin. Please try again.');
    }
  }
};


const signinWithGoogle = async (role,navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const founderSnap = await getDoc(doc(firestore, "Founder", user.uid));
    const investorSnap = await getDoc(doc(firestore, "Investor", user.uid));

    if (founderSnap.exists() || investorSnap.exists()) {
      if (founderSnap.exists()) {
        const role = founderSnap.data().role;
        alert("Login successful!");
        navigate(`/user/founder/profile`);
      }
      if (investorSnap.exists()) {
        const role = investorSnap.data().role;
        alert("Login successful!");
        navigate(`/user/investor/profile`);
      }

    } else {
      await user.delete();
      await signOut(auth);
      alert("You are not registered. Please sign up first.");
      navigate("/account/signup");
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Sign-in failed.");
  }
};

const handleCreateNewPitch = async (pitch, PitchDetails, category, funding_goal, tags) => {
    await addDoc(collection(firestore, 'Pitchs'), {
      pitch,
      PitchDetails,
      category,
      funding_goal,
      tags
    })
  };
  
  const fetchMyPitch = async (uid) => {
    const collectionRef = collection(firestore, 'Founder');
    const q = query(collectionRef, where('uid', '==', uid));
    const result = await getDoc(q);
    return result;
  };

  const listAllPitchs = () => {
    return getDocs(collection(firestore, 'Pitchs'))
  }

  const getPitchByID = async (id) => {
    const docRef = doc(firestore, 'Pitchs', id);
    const result = await getDoc(docRef);
    return r
  }

// const yourPitch = async (PitchDetails, qty) =>{
//   const collectionRef = collection(firestore, 'Founder', Your_Pitch);
//   const result = await addDoc(collectionRef, {

//   })

// }

// export const useFirebase = () => useContext(FirebaseContext);

const isLoggedIn = user ? true : false;
 
  return <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        isLoggedIn,
        user,
        loading,
      handleCreateNewPitch,
      fetchMyPitch,
      listAllPitchs
        
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  
};
