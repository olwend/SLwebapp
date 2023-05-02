import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import Navigation from './Navigation'

test('Renders properly', () => expect(shallow(<Provider store={store}><Navigation /></Provider>).dive()).toMatchSnapshot())
