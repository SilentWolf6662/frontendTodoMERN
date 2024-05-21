import { ChildComponent2 } from './ChildComponent2';
import React from 'react'
import { Title } from './../components/Title';

export const ChildComponent = ({data}) => {
	return <div>
		<Title titleText={data} />
        <ChildComponent2 data={data} />
	</div>
}
