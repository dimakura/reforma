import 'babel-polyfill'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { __cleanupTypes__ } from '../../core/lib/type'

Enzyme.configure({
  adapter: new Adapter()
})

afterEach(() => {
  __cleanupTypes__()
  jest.resetAllMocks()
})
