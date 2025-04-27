import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import homeStoreReducer from './modules/home/homeStore'
import loginStoreReducer from './modules/login/loginStore'

const store = configureStore({
  reducer: {
    home: homeStoreReducer,
    login: loginStoreReducer,
  },
  // 解决redux-persist报错问题
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      // 开发环境下使用redux-logger打印日志
      logger
    )
  },
})

//TODO get store type
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
