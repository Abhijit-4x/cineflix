import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'


const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user, setUser] = useState({});

    async function signUp( email, password ){
            await createUserWithEmailAndPassword(auth, email, password)
            setDoc( doc( db, 'users', email ), {
                savedMovies: []
            } )

        
    }

    function signIn( email, password ){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut( email, password ){
        return signOut(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged( auth, (currentUser)=>{
            return setUser(currentUser);
        } )
        return ()=>{
            unsubscribe();
        }
    })

    return(
        <AuthContext.Provider value={{ signUp, signIn, logOut, user }} >
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext);
}