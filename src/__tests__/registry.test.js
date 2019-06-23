import { Map } from 'immutable'
import { registerType, unregisterType, getType } from '../registry'

describe('type registry', () => {
  const typeName = 'myType'
  const myType = Map({isType: true})

  afterEach(() => {
    unregisterType(typeName)
  })

  test('normal registration', () => {
    registerType(typeName, myType)
    const type = getType(typeName)

    expect(type).toBe(myType)
  })

  test('register a non-type', () => {
    expect(() => {
      registerType(typeName, {})
    }).toThrow('Cannot register myType: not a type')
  })

  test('repetitive registration of type', () => {
    registerType(typeName, myType)
    expect(() => {
      registerType(typeName, myType)
    }).toThrow('Cannot register myType: already registered')
  })

  test('bad naming', () => {
    const badTypeNames = ['1a', '', null]

    badTypeNames.forEach((name) => {
      expect(() => registerType(name, myType)).toThrow(`Cannot register type: invalid name ${name}`)
    })
  })
})
