import React    from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Main from './Main';
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';

configure({ adapter: new Adapter() });

it('Invalid page redirect to 404', () => {
  const wrapper = mount(
  	<MemoryRouter initialEntries={['/random']}>
  	  <Main />
  	</MemoryRouter>
  	);
  	expect(wrapper.find(Home)).toHaveLength(0);
  	expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});
