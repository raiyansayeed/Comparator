import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './reducers/languageSlice'
import queryReducer from './reducers/querySlice'
import hitsReducer from './reducers/hitsSlice'

export default configureStore({
    reducer: {
        languages: languageReducer,
        queries: queryReducer,
        hits: hitsReducer,
    }
})