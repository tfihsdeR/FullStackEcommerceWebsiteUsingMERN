import React, { Fragment } from 'react'
import { Routes, Router, Route, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

function Header() {
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand" style={{ display: "flex", justifyContent: "center" }}>
                        <img src='/images/MERNStackImage.webp' className="img-fluid" style={{ maxHeight: "90px" }} />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <SearchBar />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <button className="btn" id="login_btn">Login</button>

                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header