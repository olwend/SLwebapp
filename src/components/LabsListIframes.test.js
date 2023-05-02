import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import LabsListIframes from './LabsListIframes'

test('Renders properly', () => expect(shallow(<Provider store={store}><LabsListIframes /></Provider>).dive()).toMatchSnapshot())
