import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import ActionButtons from './ActionButtons'

test('Renders properly', () => expect(shallow(<Provider store={store}><ActionButtons /></Provider>)).toMatchSnapshot())
