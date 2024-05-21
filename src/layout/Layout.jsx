import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom'
import React from 'react'

export const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
