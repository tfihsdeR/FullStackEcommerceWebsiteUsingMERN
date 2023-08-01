import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import SearchBar from './SearchBar'

function Header() {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { user, loading } = useSelector(state => state.auth)

    const [isTextVisible, setTextVisibility] = useState(false);
    const [textPosition, setTextPosition] = useState(0);

    const handleProfileClick = () => {
        setTextVisibility(!isTextVisible);
        if (!isTextVisible) {
            setTextPosition(0);

            const interval = setInterval(() => {
                setTextPosition((prevPosition) => prevPosition + 0.5);
            }, 10);

            setTimeout(() => {
                clearInterval(interval);
            }, 1000);
        }
    };

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand" style={{ display: "flex", justifyContent: "center" }}>
                        <Link to="/">
                            <img src='/images/MERNStackImage.webp' className="img-fluid" style={{ maxHeight: "90px" }} />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <SearchBar />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to={"/cart"} style={{ textDecoration: "none" }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count" style={{ marginLeft: "3px" }}>2</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 d-inline position-relative">
                            <Link
                                to="#"
                                className="btn text-white mr-4"
                                onClick={handleProfileClick}
                            >
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>



                            {isTextVisible && (
                                <div
                                    className="profileDropdownItem"
                                    style={{ transform: `translateY(${textPosition}px)` }}
                                >
                                    {
                                        user.role == "admin" ? (
                                            <Link to="/orders/user" >Orders</Link>
                                        ) : (
                                            <Link to="/dashboard">Dashboard</Link>
                                        )
                                    }
                                    <Link to="/user" >Profile</Link>
                                    <Link className="text-danger" to="/" >Logout</Link>
                                </div>
                            )}
                        </div>
                    ) : !loading && <Link to={"/login"} className="btn" id="login_btn" style={{ marginLeft: "10px", marginRight: "5px" }}>Login</Link>}
                </div>
            </nav>
        </Fragment>
    )
}

export default Header