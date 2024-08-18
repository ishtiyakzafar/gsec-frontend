import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from "redux-logger";
import reducer from './reducer'


const composeEnhancer = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
                            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
                            : compose

const enhancer = composeEnhancer(applyMiddleware(thunk, logger))

const store = createStore(reducer, enhancer)

export default store

