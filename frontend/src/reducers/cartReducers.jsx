import { ADD_TO_CART, SAVE_SHIPPING_INFO, REMOVE_ITEM_FROM_CART } from "../constants/cartConstants.jsx"

export const cartReducer = (state = { cartItems: null, shippingInfo: null }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload
            const existItem = state.cartItems.find(i => i.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === existItem.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product != action.payload)
            }

        default:
            return state
    }
}