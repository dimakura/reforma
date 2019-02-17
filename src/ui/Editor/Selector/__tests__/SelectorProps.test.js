import createSelectorProps from '../SelectorProps'
import { getSchema } from 'Test/factories'

describe('SelectorProps', () => {
  const selectorDS = getSchema().dataSource.getSelectorDataSource()

  test('default props', () => {
    const props = createSelectorProps({
      dataSource: selectorDS
    })

    expect(props.dataSource).toBe(selectorDS)
    expect(props.modalTitle).toBe('Select Object')
    expect(props.searchText).toBe('Search...')
    expect(props.displayProperty).toBe('toString')
  })

  test('user-defined props', () => {
    const props = createSelectorProps({
      dataSource: selectorDS,
      modalTitle: 'Select Profile',
      searchText: 'Search Profile...',
      displayProperty: 'fullName'
    })

    expect(props.dataSource).toBe(selectorDS)
    expect(props.modalTitle).toBe('Select Profile')
    expect(props.searchText).toBe('Search Profile...')
    expect(props.displayProperty).toBe('fullName')
  })

  test('#formatValue', () => {
    const props = createSelectorProps({
      dataSource: selectorDS,
      displayProperty: 'fullName'
    })

    expect(props.formatValue()).toBe('(empty)')
    expect(props.formatValue({ fullName: 'Dimitri Kurashvili' })).toBe('Dimitri Kurashvili')
    expect(props.formatValue({ firstName: 'Dimitri' })).toBe('[object Object]')
    expect(props.formatValue('test')).toBe('test')
    expect(props.formatValue(1)).toBe('1')
  })
})
