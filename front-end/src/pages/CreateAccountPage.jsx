import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth"
export default function CreateAccount(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]=useState('')
    
    const navigate=useNavigate();
    async function CreateAccount(){
        if (password!==confirmPassword){
            setError("Password and confirm password aren't the same")
            return;
        }
        try{
             await createUserWithEmailAndPassword(getAuth(),email,password)
             navigate('/login')

        }
        catch(e){
            setError(e.message)
        }
    }
    return(
        <>
        <h1>Create account</h1>
        {error && <p>{error}</p>}
        <input placeholder="Create email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Create password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
        <button onClick={CreateAccount}>Create account</button>
        <Link to="/login"> If you already have an account,Login using this link</Link>
        </>
    )
}