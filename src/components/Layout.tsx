import React, { ReactNode } from 'react'

import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className='App'>
      <header className='App-header'>
        Redux Toolkit with TypeScript and React Testing Library example
      </header>
      {children}
    </div>
  )
}
