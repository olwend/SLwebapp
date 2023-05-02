import React from 'react'

import { shallow } from 'enzyme'

import AuthUserNavBar from './AuthUserNavBar'

import store from '../redux/store'
import { Provider } from 'react-redux'

test('Renders properly', () => expect(shallow(<Provider store={store}><AuthUserNavBar /></Provider>)).toMatchSnapshot())
