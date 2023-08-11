import axios from "axios"

import {
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants.jsx"

// Get orders of the logged in user
export const getUserOrders = () => async dispatch => {
    try {
        dispatch({ type: USER_ORDERS_REQUEST })

        const { data } = await axios.get("/api/v1/user/orders")

        console.log(data)

        dispatch({
            type: USER_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: USER_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get order details of the logged in user
export const getUserOrderDetails = id => async dispatch => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/user/order/${id}`)

        console.log(data)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}