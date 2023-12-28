import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"

const cookies =  new Cookies() 

type AuthProps = {
    setIsAuth: any
}

export const Auth = ({setIsAuth}: AuthProps) => {

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true)
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <div className="auth" >
            <p>Sign in With Google to continue</p>
            <button onClick={signInWithGoogle} >
                Sign In With Google                    
            </button>
        </div>
    )
}