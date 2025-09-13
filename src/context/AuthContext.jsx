import { onAuthStateChanged, signOut } from "firebase/auth";
import { serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";


const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if(currentUser){
                const useRef = doc(db, "users", currentUser.uid);
                await updateDoc(useRef, {
                    online: true,
                    lastLogin: serverTimestamp()
                });
            }
        })

        const handleBeforeUnload = async () => {
            if(auth.currentUser){
                const userRef = doc(db,"user", auth.currentUser.uid);
                await updateDoc(userRef, {
                    online: false,
                    lastLogout: serverTimestamp()
                });
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () =>{
            window.removeEventListener('beforeunload', handleBeforeUnload);
            unsubcribe();
        }
    },[]);

    const logout = async () => {
        if (auth.currentUser){
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                online: false,
                lastlogout: serverTimestamp()
            });
        }

        await signOut(auth)
    }

    return(
        <AuthContext.Provider value={{user, logout}}> 
            {!loading && children}
        </AuthContext.Provider>
    )
};