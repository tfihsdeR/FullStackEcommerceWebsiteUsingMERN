import axios from "axios"

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_USER_FAIL
} from "../constants/userConstants.jsx"

// Login user
export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/login", { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register user
export const register = userData => async dispatch => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post("/api/v1/register", userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load user
export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get("/api/v1/profile")

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user profile
export const updateUserProfile = userData => async dispatch => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.put("/api/v1/user/profile/update", userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user password
export const updateUserPassword = password => async dispatch => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.put("/api/v1/user/password/update", password, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot password
export const forgotPassword = email => async dispatch => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/user/password/forgot", email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Reset password
export const resetPassword = (token, password) => async dispatch => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.put(`/api/v1/user/password/reset/${token}`, password, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async dispatch => {
    try {
        const { data } = await axios.get("/api/v1/logout")

        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}