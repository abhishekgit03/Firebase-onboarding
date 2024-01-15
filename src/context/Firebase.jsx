import { createContext, useContext} from "react";
import {initializeApp} from "firebase/app"
import {getAuth,  createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {getDatabase, set, ref} from "firebase/database"
const FirebaseContext=createContext(null);
const Googleprovider = new GoogleAuthProvider();


const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
  };

export const firebaseapp= initializeApp(firebaseConfig)




export const useFirebase = ()=> useContext(FirebaseContext)

export const FirebaseProvider =(props)=>
{
    const firebaseAuth =getAuth(firebaseapp)
    const database=getDatabase(firebaseapp)
    const signupUser =(email,password) =>
    {
        return createUserWithEmailAndPassword(firebaseAuth,email,password) 
             .then((value)=>alert("Success")) 
    };

    const putData =(key,data)=> set(ref(database,key), data);

     const signupwithGoogle =()=>
    {
        signInWithPopup(firebaseAuth,Googleprovider)
    }

    const signinwithEmail= (email,password)=>
    {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Success")
        })
    }

    return (
        <FirebaseContext.Provider value={{firebaseAuth,signupUser, putData, signupwithGoogle,signinwithEmail}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}