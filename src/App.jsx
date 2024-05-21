import './App.css'
import './Loaders.css'

import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom'

import { About } from './pages/About'
import { AdminTodos } from './pages/todos/AdminTodos'
import { Contact } from './pages/Contact'
import { CreateTodos } from './pages/todos/CreateTodos'
import { DeleteTodos } from './pages/todos/DeleteTodos'
import { EditTodos } from './pages/todos/EditTodos'
import { Home } from './pages/Home'
import { HomeAdmin } from './pages/admin/HomeAdmin'
import { Layout } from './layout/Layout'
import { LayoutAdmin } from './layout/admin/LayoutAdmin'
import { Login } from './pages/Login'
import { NewsAdmin } from './pages/admin/NewsAdmin'
import { PageNotFound } from './pages/PageNotFound'
import { Todos } from './pages/todos/Todos'

function App() {
	const router = createBrowserRouter([
		{
			// PUBLIC - Layout
			element: <Layout />,
			errorElement: <PageNotFound />,
			children: [
				{ path: '/', element: <Home /> },
				{ path: '/about', element: <About /> },
				{ path: '/contact', element: <Contact /> },

				// PocketBase API
				{ path: '/todos', element: <Todos /> },

				// Auth
				{ path: '/login', element: <Login /> },
			],
		},
		{
			// ADMIN - LayoutAdmin
			element: <LayoutAdmin />,
			errorElement: <PageNotFound />,
			children: [
				{ path: '/admin', element: <HomeAdmin /> },
				{ path: '/admin/news', element: <NewsAdmin /> },
				{ path: '/admin/todos', element: <AdminTodos /> },
				{ path: '/admin/todos/new', element: <CreateTodos /> },
				{ path: '/admin/todos/edit/:id', element: <EditTodos /> },
				{ path: '/admin/todos/delete', element: <DeleteTodos /> },
				{ path: '/admin/*', element: <PageNotFound /> },
			]
		}
	])

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
