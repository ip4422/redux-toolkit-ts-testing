import counterReducer, {
  CounterState,
  increment,
  decrement,
  incrementByAmount,
  counterStatus,
  incrementAsync
} from './counterSlice'

describe('counter reducer sync actions', () => {
  const initialState: CounterState = {
    value: 3,
    status: counterStatus.idle,
    error: ''
  }
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: counterStatus.idle,
      error: ''
    })
  })

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment())
    expect(actual.value).toEqual(4)
  })

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement())
    expect(actual.value).toEqual(2)
  })

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2))
    expect(actual.value).toEqual(5)
  })
})

describe('counter reducer async actions', () => {
  const initialState: CounterState = {
    value: 5,
    status: counterStatus.idle,
    error: ''
  }

  it('should set status to "pending"', async () => {
    const action = { type: incrementAsync.pending.type }
    const state = counterReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: counterStatus.pending
    })
  })

  it('should set status to "idle"', async () => {
    const amount = 2
    const action = { type: incrementAsync.fulfilled.type, payload: amount }
    const state = counterReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      value: initialState.value + amount,
      status: counterStatus.idle
    })
  })


  it('should set status to "failed"', async () => {
    const action = { type: incrementAsync.rejected.type, payload: 'loading error' }
    const state = counterReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      error: 'loading error',
      status: counterStatus.failed
    })
  })

})
