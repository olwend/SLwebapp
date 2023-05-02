import React from 'react'

import { shallow } from 'enzyme'

import NonAuthUserNavBar from './NonAuthUserNavBar'

test('Renders properly', () => expect(shallow(<NonAuthUserNavBar />)).toMatchSnapshot())
