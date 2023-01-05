import rootReducer from './rootReducer'
import { configureStore, createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart', 'preferences']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = configureStore(
    {reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
        /* É necessário que o middleware padrão do Redux-toolkit ignore a checagem das actions do redux-persist, que não obedecem o padrão do Redux de serem strings...
        Trata-se de incompatibilidade entre as duas bibliotecas que requer a ação abaixo pelo desenvolvedor */
        getDefaultMiddleware({serializableCheck:
            false
            // Posso tentar especificar os tipos de ações a serem ignoradas também:
            // {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
        })
    })
let persistor = persistStore(store)

export { store, persistor }