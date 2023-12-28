import { FormEvent, useState, useEffect } from "react"
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore"
import { auth, db } from "../firebase-config"
import "../styles/Chat.css"

type ChatProps = {
    room: string
}

export const Chat = ({room}: ChatProps) => {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState<any>([])

    const messagesRef = collection(db, "messages")

    useEffect(()=> {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages: any = []
            snapshot.forEach((doc)=> {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        }) 

        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(newMessage === "") return 

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            room
        })
        setNewMessage('')
    }

    return (
        <div className="chat-app" >
            <div className="header" >
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages" >
                {
                    messages.map((message: any) => (
                        <div key={message.id} className="message" >
                            <span className="user" >{message.user}</span>
                            {message.text}
                        </div>
                    ))
                }
            </div>
            <form onSubmit={handleSubmit} className="new-message-form" >
                <input 
                  className="new-message-input"
                  placeholder="Type your message here..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button className="send-button" >
                    Send
                </button>
            </form>
        </div>
    )
}