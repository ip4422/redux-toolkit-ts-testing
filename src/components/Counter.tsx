import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../utils/hooks'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount
} from '../store/counter/counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useAppSelector(selectCount)
  const error = useAppSelector(state => state.counter.error)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      {error && <div>{error}</div>}
      <div>
        <div className={styles.row}>
          <button
            className={styles.button}
            aria-label='Decrement value'
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label='Increment value'
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label='Set increment amount'
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => dispatch(incrementByAmount(incrementValue))}
          >
            Add Amount
          </button>
          <button
            className={styles.asyncButton}
            onClick={() => dispatch(incrementAsync(incrementValue))}
          >
            Add Async (random value)
          </button>
          <button
            className={styles.button}
            onClick={() => dispatch(incrementIfOdd(incrementValue))}
          >
            Add If Odd
          </button>
        </div>
      </div>
    </div>
  )
}
