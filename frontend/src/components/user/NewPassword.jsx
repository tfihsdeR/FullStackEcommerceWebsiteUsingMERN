import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert"
import { useNavigate, useParams } from 'react-router-dom'

import MetaData from "../layout/MetaData.jsx"
import { resetPassword, clearErrors } from '../../actions/userActions.jsx'


function NewPassword() {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { token } = useParams()

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Password updated successfully.")

            navigate("/login")
        }

    }, [dispatch, error, alert, success, token, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set("password", password)
        formData.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(token, formData))
    }

    return (
        <Fragment>
            <MetaData title={"Reset Password"} />
            <div className="container-container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">New Password</h1>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm_password_field">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                id="new_password_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                Set Password
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default NewPassword