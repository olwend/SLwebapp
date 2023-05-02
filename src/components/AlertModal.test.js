import React from 'react'

import { shallow } from 'enzyme'

import AlertModal from './AlertModal'

test('Renders properly', () => expect(shallow(<AlertModal />)).toMatchSnapshot())
