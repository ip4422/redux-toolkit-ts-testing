import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { App, store } from './'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(
    getByText(
      /Redux Toolkit with TypeScript and React Testing Library example/i
    )
  ).toBeInTheDocument()
})
