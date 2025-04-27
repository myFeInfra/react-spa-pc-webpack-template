import React, { memo, Fragment } from 'react'
import Router from '@/router/router'

interface AppProps {
  children?: React.ReactNode
}

const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <Fragment>
      <Router />
    </Fragment>
  )
}

export default memo(App)
