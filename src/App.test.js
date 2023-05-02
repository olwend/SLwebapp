import React from 'react'

import { shallow } from 'enzyme'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

test('Renders properly', () => expect(shallow(<Router><App /></Router>).dive()).toMatchSnapshot())
