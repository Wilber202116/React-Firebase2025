import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useAuth } from '../context/AuthContext';
import { use, useEffect } from 'react';
import { getDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';

function Login (){

  const navigate = useNavigate();
  const {user} = useAuth();

  useEffect(() => {
    const saveUser = async () => {
      if(!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if(!userSnap.exists()){
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          online: true
        })
        console.log("Usuario Creado en firestore correctamente");
      }else{
        console.log("Usuario ya existia en DB");
      }

      navigate('/chat')
    }

    saveUser();
  },[user, navigate]);
  
  const handleGoogleLogin = async () => {
    try{
      //proveedor para hacer login
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({prompt: "select_account"});
      await signInWithPopup(auth, provider);
    }catch(e){
      console.error("Error al hacer login",e);
    }
  }

  return (
    <>
      <div className='flex h-screen items-center justify-center bg-[url(https://i.pinimg.com/736x/41/6f/4e/416f4e6077fe57cb51a12171b7c4c22a.jpg)] bg-no-repeat bg-cover'>
        <div className='bg-white p-8 rounded shadow text-center'>
          <h1 className='text-2xl mb-4 font-bold'>Bienvenido al chat</h1>
          <button className='bg-blue-500 rounded text-white px-4
          py-2 hover:bg-orange-600 cursor-pointer' 
          onClick={handleGoogleLogin}>
            Iniciar Sesion con Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Login;