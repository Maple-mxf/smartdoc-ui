import {applyMiddleware, combineReducers, compose, createStore,} from 'redux'
import globalReducer from './reducer'
import {reducer as projectReducer} from '../main/project/store'
import {reducer as navTreeReducer} from '../main/document/tree/store'
import {reducer as docReducer} from '../main/document/store'
import {reducer as docExploreReducer} from '../main/document/explore/store'
import {
    DOC_REDUCER_NAMESPACE,
    GLOBAL_REDUCER_NAMESPACE,
    NAV_TREE_REDUCER_NAMESPACE,
    PROJECT_REDUCER_NAMESPACE,
    DOC_EXPLORE_REDUCER_NAMESPACE
} from '../util/constants'
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    [GLOBAL_REDUCER_NAMESPACE]:  globalReducer,
    [PROJECT_REDUCER_NAMESPACE]: projectReducer,
    [NAV_TREE_REDUCER_NAMESPACE]:navTreeReducer,
    [DOC_REDUCER_NAMESPACE]: docReducer,
    [DOC_EXPLORE_REDUCER_NAMESPACE]:docExploreReducer
})

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