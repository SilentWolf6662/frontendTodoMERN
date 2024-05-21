import React, { useState } from 'react'

import { ChildComponent } from './ChildComponent'
import { Title } from '../components/Title'

export const Home = () => {
	return <div>
		<Title titleText="Home" />
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
			<p className="text-lg mt-4 mb-8">This is a simple Home Page</p>
		</div>
	</div>
}
