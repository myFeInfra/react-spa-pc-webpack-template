import React, { memo, Suspense } from 'react'
import ErrorBoundary from './errorBoundary'
import routes from '@/router/router'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/stores/index'
import '@/assets/css/reset.scss'

interface AppProps {
  children?: React.ReactNode
}
const WithAppConfigHoc = (WrapperComponent: React.FC<AppProps>) => {
  const AppConfigHoc: React.FC<AppProps> = (props: AppProps) => {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <ErrorBoundary>
            <HashRouter>
              <Suspense fallback={<div>loading...</div>}>
                <WrapperComponent {...props} />
              </Suspense>
            </HashRouter>
          </ErrorBoundary>
        </Provider>
      </React.StrictMode>
    )
  }
  return memo(AppConfigHoc)
}

export default WithAppConfigHoc
