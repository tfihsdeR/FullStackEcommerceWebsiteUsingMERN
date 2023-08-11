import {
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants.jsx"

export const userOrdersReducer = (state = { orders: null }, action) => {
    switch (action.type) {

        case USER_ORDERS_REQUEST:
            return {
                loading: true
            }

        case USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case USER_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const userOrderDetailsReducer = (state = { order: null }, action) => {
    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}