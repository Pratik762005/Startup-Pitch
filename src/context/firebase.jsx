import { createContext, useContext } from "react";
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
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDNb1aS2ZBTHeWftOSdeHcPZyb149KrHEk",
  authDomain: "startup-pitch-portal.firebaseapp.com",
  projectId: "startup-pitch-portal",
  storageBucket: "startup-pitch-portal.appspot.com",
  messagingSenderId: "428561967266",
  appId: "1:428561967266:web:f173dec8cfee0f8286cffb",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const signupUserWithEmailAndPassword = async (email, password, name, lastName, navigate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

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
    navigate("/account/otp_verification");
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
};
export { signupUserWithEmailAndPassword };

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
    console.error("Google Signup Error:", error);
    alert("Something went wrong during Google Signup.");
  }
};


const signinWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const founderSnap = await getDoc(doc(firestore, "Founder", user.uid));
    const investorSnap = await getDoc(doc(firestore, "Investor", user.uid));

    if (founderSnap.exists() || investorSnap.exists()) {
      navigate("/");
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

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
