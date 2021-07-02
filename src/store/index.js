import {applyMiddleware, combineReducers, compose, createStore,} from 'redux'
import createSagaMiddleware from 'redux-saga'
import globalReducer from './reducer'
import {reducer as projectReducer} from '../main/project/store'
import {GLOBAL_REDUCER_NAMESPACE,PROJECT_REDUCER_NAMESPACE} from '../common/constants'
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    [GLOBAL_REDUCER_NAMESPACE]:  globalReducer,
    [PROJECT_REDUCER_NAMESPACE]: projectReducer,
})

export const sagaMiddleware = createSagaMiddleware()

//
export default (initialState)=>{
    // 浏览器redux查看插件
    const reduxDebug = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            reduxDebug
        )
    )
}