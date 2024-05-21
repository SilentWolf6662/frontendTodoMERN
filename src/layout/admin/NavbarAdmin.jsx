import { LoginContext } from '../../context/LoginContext';
import { NavLink } from 'react-router-dom'
import { SignOutButton } from '../../components/SignOutButton';
import { useContext } from 'react'

const handleClick = () => {
	const dropdown = document.activeElement;

	if (dropdown) dropdown?.blur();
};

export const NavbarAdmin = () => {
	const { user } = useContext(LoginContext);

	return <nav>
		<menu className='flex gap-5 border border-slate-600 bg-neutral shadow-xl m-5 p-5 rounded-lg'>
			<li>
				<NavLink to="admin">Admin Home</NavLink>
			</li>
			<li>
				<NavLink to="admin/news">Admin News</NavLink>
			</li>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<div className="dropdown">
					<button tabIndex="0" role="button" className="">
						<span className="mr-1">Todos</span>
					</button>
					<ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral border border-slate-600 rounded-box w-52">
						<li className="">
							<NavLink to="/admin/todos/new" onClick={handleClick}>Create a new todo</NavLink>
						</li>
						<li className="">
							<NavLink to="/admin/todos" onClick={handleClick}>Todos</NavLink>
						</li>
					</ul>
				</div>
			</li>
			<li>
				<SignOutButton />
			</li>
		</menu>
	</nav>
}
