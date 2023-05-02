import React from 'react'

import { shallow } from 'enzyme'

import store from '../redux/store'
import { Provider } from 'react-redux'

import BaseListIframes from './BaseListIframes'

test('Renders properly', () => expect(shallow(<Provider store={store}><BaseListIframes /></Provider>).dive()).toMatchSnapshot())
