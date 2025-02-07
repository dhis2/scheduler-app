/* eslint-disable import/no-unused-modules */

import Enzyme from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'
import { cleanup, makeAdapter } from '../test/cleanup'

afterEach(cleanup)

Enzyme.configure({ adapter: makeAdapter(Adapter) })
