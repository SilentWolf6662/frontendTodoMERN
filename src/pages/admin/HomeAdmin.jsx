import { LoginContext } from '../../context/LoginContext';
import { Title } from '../../components/Title'
import { useContext } from 'react'

export const HomeAdmin = () => {
	const { user } = useContext(LoginContext);
	return <div>
		<Title titleText={`Welcome back ${user}`} />
	</div>
}
