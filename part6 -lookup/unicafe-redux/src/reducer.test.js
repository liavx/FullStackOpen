import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }
    
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  test('zero resets to initial state', () => {
    const state = { good: 3, ok: 2, bad: 5 }
    deepFreeze(state)
    const newState = counterReducer(state, { type: 'ZERO' })
    expect(newState).toEqual(initialState)
  })

  test('works for a sequence of actions (immutably)', () => {
    const actions = [
      { type: 'GOOD' },
      { type: 'GOOD' },
      { type: 'BAD' },
      { type: 'OK' },
      { type: 'ZERO' },
      { type: 'BAD' },
    ]

    let state = initialState
    actions.forEach(a => {
      deepFreeze(state)
      state = counterReducer(state, a)
    })
    expect(state).toEqual({ good: 0, ok: 0, bad: 1 })
  })

})