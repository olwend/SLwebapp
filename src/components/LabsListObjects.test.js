import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import LabsListObjects from './LabsListObjects'

test('Renders properly', () => expect(shallow(<Provider store={store}><LabsListObjects /></Provider>).dive()).toMatchSnapshot())
