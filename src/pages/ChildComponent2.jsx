import React, { useState } from 'react'

import { Title } from './../components/Title';

export const ChildComponent2 = ({ data }) => {
	const [data2, setData2] = useState('Test')
	return <div>
		<Title titleText={data} />
		<input type="text" placeholder="Enter some text" onChange={(e) => setData2(e.target.value)} />
	</div>
}
