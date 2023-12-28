import { useState, useRef } from "react";
import "./App.css";
import Cookies from "universal-cookie";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth"
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("")

  const roomInputRef = useRef<HTMLInputElement>(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom("")
  }
 
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      <div>
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room">
            <label>Enter Room Name:</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current?.value || "")}>
              Enter Chat
            </button>
          </div>
        )}
      </div>
      <div className="sign-out" >
          <button onClick={signUserOut} >Sign out</button>
      </div>
    </>
  );
}

export default App;
