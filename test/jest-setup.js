import 'jest-enzyme'
import Enzyme from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'

// -- ENZYME

Enzyme.configure({
  adapter: new React16Adapter()
})

// -- MOCKS

jest.mock('reforma/api')
afterEach(jest.resetAllMocks)
