// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5dhVoVOnsQwDF9zNffdYTFpMCRP18eGc",
  authDomain: "netflix-clone-4e405.firebaseapp.com",
  projectId: "netflix-clone-4e405",
  storageBucket: "netflix-clone-4e405.appspot.com",
  messagingSenderId: "828127462092",
  appId: "1:828127462092:web:9ffc8f8c24093f7f177869"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//user signup -function
const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


//login function 
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

//logout function
const logout = () => {
    signOut(auth);
}

export {
    auth, 
    db,
    login,
    signup,
    logout
}