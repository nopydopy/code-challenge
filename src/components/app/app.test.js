import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import ListView from '../list-view';


describe('<App>', () => {
  it('renders a h1 headline and only one h1 element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('renders a ListView component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ListView)).toHaveLength(1);
  });
})

