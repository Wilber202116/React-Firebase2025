function MessageForm({ text, setText, onSend, darkMode}){

    return(
        <form onSubmit={onSend} 
            className={` p-4 flex items-center 
            ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} 
            className={`flex  flex-1 p-2 border rounded mr-2 
                ${darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"}`} 
            placeholder="Escribe un mensaje"/>
            <div className="relative group">
                <button onClick={onSend} className="flex bg-blue-500 text-white px-3 py-3 rounded-full 
                hover:bg-orange-600 flex place-content-center items-center content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <span className={`absolute -top-7 -left-1/10 px-3 opacity-0 group-hover:opacity-100 pointer-events-none
                    ${darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"} z-50`}>Enviar</span>
            </div>
            

        </form>
    )
}

export default MessageForm;