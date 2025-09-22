import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { use, useEffect, useRef, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import {X, Menu, Moon, Sun} from "lucide-react"
import UserList from "../components/chat/UserList";
import MessageList from "../components/chat/MessageList";
import MessageForm from "../components/chat/MessageFrom";


function Chat(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [ onlineUsers, setOnlineUsers ] = useState([]);
    const [ messages, setMessages ] = useState([]);
    const [ text, setText ] = useState('');
    const [ showSideBar, setShowSideBar] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        const defaultTheme = localStorage.getItem("defaultTheme");
        return defaultTheme ? JSON.parse(defaultTheme) : false;
    });
    const chatEndRef = useRef(null);

    useEffect(() => {
        const defaultTheme = localStorage.getItem("defaultTheme");

        if(defaultTheme !== null){
            setDarkMode(JSON.parse(defaultTheme));
        }
        
    },[])

    useEffect(() => {
        localStorage.setItem("defaultTheme", JSON.stringify(darkMode));
    }, [darkMode]);

    const handledLogout = async () => {
        await logout();
        navigate('/');
    }

    useEffect(() => {

        const unsubscribe = onSnapshot(
            query(collection(db, "users")),
            (snapshot) =>{
                const onlineUsers = snapshot.docs
                .map((doc) => doc.data())
                .filter((u) => u.online);
                setOnlineUsers(onlineUsers);
            }
        )

        return () => unsubscribe();
        
        
    },[])

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handlesend = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        await addDoc(collection(db, "messages"), {
            text,
            uid: user.uid,
            name: user.displayName,
            photoURl: user.photoURL,
            timeStamp: serverTimestamp()
        });

        setText('');
        scrollToBottom();
    };

    useEffect(() => {
        const hola = query(collection(db, "messages"), orderBy("timeStamp"));
        const unsubscribe = onSnapshot(hola, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
            setMessages(msgs);
            scrollToBottom();
        });
        
        return () => unsubscribe();
    },[])

    useEffect(() => {
        scrollToBottom();
    },[])

    return(
        
        <>
            <div className={`flex w-screen h-screen relative overflow-hidden transition-colors duration-300
                ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}>
                {/* Boton toggie */}

                <div className="w-0 h-0 absolute top-4 left-4 z-20 relative group">
                    <button className="  bg-gray-600 px-3 py-1 rounded hover:bg-gray-500 "
                    onClick={() => setShowSideBar(!showSideBar)}>
                        {showSideBar ? <X size={20}/> : <Menu size={20} /> }
                    </button>
                    <span className="absolute rounded px-1 top-0 left-12 opacity-0 group-hover:opacity-100 pointer-events-none
                    bg-gray-500">{showSideBar ? "Ocultar": "Mostrar"}</span>
                </div>
                
                <div className="top-149 -right-239 z-20 relative group">
                    <button onClick={() => setDarkMode(!darkMode)}
                        className="fixed top-110 right-7 bg-gray-800 text-white p-2
                        rounded-full shadow hover:bg-gray-700 cursor-pointer">
                            {darkMode ? <Sun size={20}/> : <Moon size={20}/> }
                    </button>
                    <span className="absolute rounded text-sm -top-50 left-45 px-1 opacity-0 group-hover:opacity-100 pointer-events-none
                    bg-gray-500 text-center">{darkMode ? "Modo claro": "Modo oscuro"}</span>
                </div>

                

                {/* Panel izquierdo de Usuarios online */}
                <aside className={`fixed top-0 left-0 h-full w-64 p-4
                    p-2 overflow-y-auto transform transition-transfrm duration-300 ease-in-out 
                    ${showSideBar ? "translate-x-0" : "-translate-x-full"}
                    ${darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"}`}>
                    <UserList onlineUsers={onlineUsers} onLogout={handledLogout} darkMode={darkMode}/>
                </aside>

                <main className={`flex-1 flex flex-col h-full border-1 transition-all duration-300
                    ${showSideBar ? "md:ml-64" : "ml-0-w-full"}
                    ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>

                    {/* formulario de chat */}
                    <MessageList messages={messages} user={user} chatEndRef={chatEndRef} darkMode={darkMode}/>

                    {/* Caja para comentar */}
                    <MessageForm text={text} setText={setText} onSend={handlesend} darkMode={darkMode} />

                </main>
            </div>
        </>
    )
}

export default Chat;