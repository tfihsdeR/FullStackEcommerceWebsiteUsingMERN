import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { productReducer, productDetailsReducer } from "./reducers/productReducer"
import { authReducer, forgotPasswordReducer, userReducer } from "./reducers/userReducers.jsx"
import { cartReducer } from "./reducers/cartReducers.jsx"

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
}

// const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store