function MessageItem({ msg, user, darkMode }){
    const formatTime = (timeStamp) => {
        if (!timeStamp) return '';
        const date = timeStamp.toDate();
        return date.toLocaleTimeString({
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const isMyMessage = msg.uid === user.uid;
    console.log(`este es el mensaje: ${msg.uid}`);
    console.log(user);
    
    console.log(isMyMessage)

    return(
        <div key={msg.id}
        className={`mb-3 flex ${isMyMessage ? "justify-start" : "justify-end"}
        ${darkMode ? "bg-gray-700" : "bg-gray-200 text-black"}`}>
            <div 
            className={`max-w-sx px-3 shadow-lg z-10 text-sm 
                ${isMyMessage 
                    ? (darkMode ? "bg-blue-800 text-white" : "bg-blue-400 text-black") 
                    : (darkMode ? "bg-gray-700 text-white" : "bg-gray-400 text-black")
                } 
                ${isMyMessage ? "rounded-lg rounded-br-none" : "rounded-lg rounded-bl-none "}`}>
                <div className="flex items-center mb-4">
                    <img className="w-7 h-7 rounded-full mr-2 mt-2" 
                    src={msg.photoURl} alt={msg.name} />
                    <span className="font-semibold">
                        {msg.uid === user.uid ? "Tú" : msg.name }
                    </span>
                    <span className={`ml-8 text-xs`}>
                        {formatTime(msg.timeStamp)}
                    </span>
                </div>
                <p className="mb-2"> {msg.text} </p>
            </div>
        </div>
    )
}

export default MessageItem;