import createArrayReducer from './create-array-reducer'

describe('createArrayReducer', () => {
  let reducer
  beforeEach(() => {
    reducer = createArrayReducer([], {
      PUSH_ACTION: 'push',
      POP_ACTION: 'pop',
      UPDATE_INDEX_ACTION: 'updateValueAtIndex',
      CONCAT_ACTION: 'concat',
      CLEAR_ACTION: 'clear',
      FILTER_ACTION: 'filter',
      MAP_ACTION: 'map',
      RESET_ACTION: 'reset'
    })
  })

  it('should return initialState when action is not found', () => {
    const nextState = reducer(undefined, { type: 'RANDOM' })
    expect(nextState).toEqual([])
  })

  it('should push action payload to end of array when push action is found', () => {
    const nextState = reducer(['dog'], { type: 'PUSH_ACTION', payload: 'cat' })
    expect(nextState).toEqual(['dog', 'cat'])
  })

  it('should pop action payload to end of array when push action is found', () => {
    const nextState = reducer(['dog', 'cat'], { type: 'POP_ACTION' })
    expect(nextState).toEqual(['dog'])
  })

  it('should concat action payload to end of array when concat action is found', () => {
    const nextState = reducer(['dog', 'cat'], {
      type: 'CONCAT_ACTION',
      payload: ['dog', 'cat']
    })
    expect(nextState).toEqual(['dog', 'cat', 'dog', 'cat'])
  })

  it('should clear array when clear action is found', () => {
    const nextState = reducer(['dog', 'cat'], { type: 'CLEAR_ACTION' })
    expect(nextState).toEqual([])
  })

  it('should filter array w/ appropriate filter function when filter action is found', () => {
    const nextState = reducer(['dog', 'cat'], {
      type: 'FILTER_ACTION',
      payload: (element, index) => element !== 'cat'
    })
    expect(nextState).toEqual(['dog'])
  })

  it('should map array w/ appropriate map function when map action is found', () => {
    const nextState = reducer([5, 10], {
      type: 'MAP_ACTION',
      map: (element, index) => element + 5
    })
    expect(nextState).toEqual([10, 15])
  })

  it('should reset to initialState if reset action is found', () => {
    const result = reducer(undefined, { type: 'RESET_ACTION' })
    expect(result).toEqual([])
  })

  it('should update index w/ value if update action is found', () => {
    const result = reducer(['dog', 'cat'], {
      type: 'UPDATE_ACTION',
      payload: (value) => value + 'dog'
    })
    expect(result).toEqual(['dog', 'catdog'])
  })
})
