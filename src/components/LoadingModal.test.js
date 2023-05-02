import React from 'react'

import { shallow } from 'enzyme'

import LoadingModal from './LoadingModal'

test('Renders properly', () => expect(shallow(<LoadingModal />)).toMatchSnapshot())
