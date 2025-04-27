import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import WithAppConfigHoc from './hocs/witchAppConfigHoc'
import '@/assets/css/reset.scss'

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
)

const AppConfigHoc: React.FC = WithAppConfigHoc(App)

root.render(<AppConfigHoc />)
