import { useState } from "react";
import {X} from "lucide-react"

function UserList({onlineUsers, onLogout, darkMode}){
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    }

    const closeModal = () =>{
        setSelectedUser(null);
    }

    return(
        <>
            <aside className={`w-56 p-4 mt-3 overflow-y-auto 
                ${darkMode ? "bg-gray-800 text-white " : "bg-gray-300 text-black"}`}>
                <div className="flex justyfy-between items-center mb-4">
                    <h2 className="text-xl font-bold">Usuarios conectados</h2>
                    <div className="relative group mr-2">
                        <button onClick={onLogout} className="bg-blue-600 ml-16 text-white px-2 py-1 rounded
                        text-sm hover:bg-orange-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                        </button>
                        <span className={`absolute top-8 left-16  p-1 text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none
                            ${darkMode ? "bg-gray-600 text-white " : "bg-gray-400 text-black"}`}>Salir</span>
                    </div>
                </div>
                <ul>
                    { onlineUsers.map( (u) => (
                        <li onClick={() => handleUserClick(u)} key={u.uid} className="flex items-center mb-2 hover:bg-gray-500 cursor-pointer p-3">
                            <img src={u.photoURL} alt={u.displayName} className="bg-red-500 w-9 h-9 rounded-full mb-2"/>
                            <span className="m-2 min-h-9">{u.name}</span>
                        </li>
                    ))}
                </ul>

            </aside>
            <div className="relative">
                {/* Modal */}
                {selectedUser && (
                    <div className="absolute -left-0 fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className={` bg-white rounded-lg shadow-lg p-6 w-60`}>
                            <div className="flex justify-center items-center border-b pb-2 mb-2">
                                <h3 className="text-lg font-bold"> Perfil de {selectedUser.name} </h3>
                                <button className="text-gray-800 hover:text-gray-700 cursor-pointer ml-2" 
                                onClick={closeModal}>
                                    <X size={20}/>
                                </button>
                            </div>
                            <div className="flex flex-col item-center">
                                <img className="w-16 h-16 rounded-full mb-1 " 
                                src={selectedUser.photoURL} alt={selectedUser.name} />
                            </div>
                            <div className="flex flex-col text-left items-center">
                                <p>
                                    <span className="font-semibold text-sm">Nombre: <span> {selectedUser.name} </span> </span>
                                </p>
                                <p>
                                    <span className="font-semibold text-sm">Email: <span> {selectedUser.email } </span> </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </>
    );
}

export default UserList;