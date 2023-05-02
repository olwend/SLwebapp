import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import FilterSideBar from './FilterSideBar'

test('Renders properly', () => expect(shallow(<Provider store={store}><FilterSideBar /></Provider>).dive()).toMatchSnapshot())
