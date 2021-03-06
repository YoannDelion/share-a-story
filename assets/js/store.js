import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
import rootReducer from './reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'authReducer',
    storage,
    whitelist: ['authReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [...getDefaultMiddleware({
    serializableCheck: false,
}), logger]

const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware
})

const persistore = persistStore(store)

export default store
export { persistore }