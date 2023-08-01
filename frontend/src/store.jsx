import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { productReducer, productDetailsReducer } from "./reducers/productReducer"
import { authReducer } from "./reducers/userReducers.jsx"

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer
})

let initialState = {}



const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store