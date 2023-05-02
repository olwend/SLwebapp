import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import BaseListObjects from './BaseListObjects'

test('Renders properly', () => expect(shallow(<Provider store={store}><BaseListObjects /></Provider>).dive()).toMatchSnapshot())
