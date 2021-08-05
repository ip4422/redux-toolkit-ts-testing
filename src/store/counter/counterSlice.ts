import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { fetchCount } from './counterAPI'
import { CounterState, counterStatus } from './types'

export const initialState: CounterState = {
  value: 0,
  status: counterStatus.idle,
  error: ''
}

/**
 * Asunc increment action creator
 * The function below is called a thunk and allows us to perform async logic. It
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 * @fulfilled {number} - returned amount
 * @param {number} amount - new amount
 * @rejected {string} - Error message
 *
 */
export const incrementAsync = createAsyncThunk<
  // Return type of the payload creator
  number,
  // First argument to the payload creator
  number,
  {
    // Optional fields for defining thunkApi field types
    rejectValue: string
  }
>('counter/fetchCount', async (amount, thunkApi) => {
  const response = await fetchCount(amount)
  if (response.data !== 5) {
    // The value we return becomes the `fulfilled` action payload
    return response.data
  } else {
    // For example we can return validation result here
    return thunkApi.rejectWithValue('Validation error! Response data was 5!')
  }
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.status = counterStatus.pending
        state.error = ''
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = counterStatus.idle
        state.value += action.payload
        state.error = ''
      })
      // some error occurred while loading repository content
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = counterStatus.failed
        if (action.payload) {
          // For example this could be validation error handling
          state.error = action?.payload
        } else {
          state.error = action.error.message
        }
      })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }

export default counterSlice.reducer
export * from './types'
