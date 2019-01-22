import 'jest-enzyme'
import Enzyme from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'
import { __reset__ as resetSchemas } from 'reforma/schema'

// -- ENZYME

Enzyme.configure({
  adapter: new React16Adapter()
})

// -- MOCKS

jest.mock('reforma/api')
afterEach(() => {
  jest.resetAllMocks()
  resetSchemas()
})
