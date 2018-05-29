import React    from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import Main from './Main';
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';

describe('Main component', () => {
  it('Invalid page redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <Main />
      </MemoryRouter>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(Page404)).toHaveLength(1);
  });
})