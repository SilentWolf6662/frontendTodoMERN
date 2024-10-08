import { LoginContext } from '../context/LoginContext';
import { Navigate } from 'react-router-dom';
import { Title } from '../components/Title'
import { useContext } from 'react'

export const Login = () => {
    const { signIn, user } = useContext(LoginContext);

    if (user) return <Navigate to={"/admin"} replace />

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        signIn(form.inpIdentity.value, form.inpPW.value);
    }

    return <div className='ml-10'>
        <Title titleText="Login" />
        <form onSubmit={handleLogin} className='flex flex-col gap-5'>
            <label className="input input-bordered flex items-center gap-2 w-96">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="text" name='inpIdentity' className="grow border-none" placeholder="Username" autoComplete='username' />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-96">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" name="inpPW" className="grow border-none" placeholder="Password" autoComplete='current-password' />
            </label>
            <button type="submit" className="btn btn-accent mb-10 w-28">Login</button>
        </form>
    </div>
}
