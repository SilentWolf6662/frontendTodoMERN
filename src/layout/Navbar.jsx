import React, { useContext } from 'react'

import { LoginContext } from './../context/LoginContext';
import { NavLink } from 'react-router-dom'
import { SignOutButton } from '../components/SignOutButton';

const handleClick = () => {
	const dropdown = document.activeElement;

	if (dropdown) dropdown?.blur();
};

export const Navbar = () => {
	const { user } = useContext(LoginContext);

	return <nav>
		<menu className='flex gap-5 border border-slate-600 bg-neutral shadow-xl m-5 p-5 rounded-lg'>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="about">About</NavLink>
			</li>
			<li>
				<NavLink to="contact">Contact</NavLink>
			</li>
			<li>
				<div className="dropdown">
					<button tabIndex="0" role="button" className="">
						<span className="mr-1">Todos</span>
					</button>
					<ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral border border-slate-600 rounded-box w-52">
						<li className="">
							<NavLink to="todos" onClick={handleClick}>All</NavLink>
						</li>
					</ul>
				</div>
			</li>

			{
				user ? (
					<>
						<li>
							<NavLink to="admin">Admin</NavLink>
						</li>
						<SignOutButton />
					</>
				) : (
					<li>
						<NavLink to="login">Login</NavLink>
					</li>
				)
			}
		</menu>
	</nav>
}
