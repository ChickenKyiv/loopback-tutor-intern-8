import React from 'react'
import { shallow } from 'enzyme'
import About from '../Home'

describe('About component', () => {
	it('About renders correctly', () => {
		const wrapper = shallow(<About />);

	    expect(wrapper).toMatchSnapshot();
	})
})