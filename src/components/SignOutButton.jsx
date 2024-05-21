import { LoginContext } from '../context/LoginContext';
import { useContext } from 'react'

export const SignOutButton = () => {
    const { signOut } = useContext(LoginContext);
    return (
        <button onClick={() => signOut()}>LOGOUT</button>
    )
}
