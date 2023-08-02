import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom'

import MetaData from "../layout/MetaData.jsx"
import { updateUserPassword, clearErrors } from '../../actions/userActions.jsx'
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants.jsx"

function UpdatePassword() {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector(state => state.user)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Password updated successfully.")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })

            navigate("/user/profile")
        }

    }, [dispatch, error, alert, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set("oldPassword", oldPassword)
        formData.set("newPassword", newPassword)

        dispatch(updateUserPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={"Change Password"} />
            <div className="container-container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mt-2 mb-5">Update Password</h1>
                            <div className="form-group">
                                <label htmlFor="old_password_field">Old Password</label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="new_password_field">New Password</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-4 mb-3">
                                <button
                                    type="submit"
                                    className="btn update-btn btn-block"
                                    disabled={loading ? true : false}
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword