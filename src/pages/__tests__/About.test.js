import React from 'react'
import { renderer } from 'react-test-renderer'
import About from '../Home'

it('About renders correctly', () => {
	console.log(<About/>)
	const rendered = renderer.create(<About />);

    expect(rendered.toJSON()).toMatchSnapshot();
})