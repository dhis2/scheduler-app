/* eslint-disable import/no-unused-modules */

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { cleanup, makeAdapter } from '../test/cleanup'

afterEach(cleanup)

Enzyme.configure({ adapter: makeAdapter(Adapter) })
