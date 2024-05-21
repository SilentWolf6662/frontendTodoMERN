import { Navigate, Outlet } from 'react-router-dom';

import { FooterAdmin } from './FooterAdmin';
import { HeaderAdmin } from './HeaderAdmin';
import { LoginContext } from '../../context/LoginContext';
import { useContext } from 'react'

export const LayoutAdmin = () => {
	const { user } = useContext(LoginContext);

	if (!user) return <Navigate to={"/login"} replace />

	return (
		<>
			<HeaderAdmin />
			<main>
				<Outlet />
			</main>
			<FooterAdmin />
		</>
	)
}
