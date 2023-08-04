import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert"

import MetaData from "../layout/MetaData.jsx"
import Loader from "../layout/Loader.jsx"
import { login, clearErrors } from "../../actions/userActions.jsx"

function Login() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, isAuthenticated, error, alert])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div>
            <Fragment>
                {loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={"login"} />
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitHandler}>
                                    <h1 className="mb-3">Login</h1>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)} />
                                    </div>

                                    <div className="float-right my-4">
                                        <Link to="/user/password/forgot" style={{ float: "right" }} className="float-right mb-4">Forgot Password?</Link>
                                    </div>
                                    <div className="d-flex justify-content-center ">
                                        <button id="login_button" type="submit" className="btn btn-block py-3">LOGIN</button>
                                    </div>

                                    <div className="float-right mt-3">
                                        <Link to="/register" style={{ float: "right" }} className="float-right mt-3">New User?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </div>
    )
}

export default Login