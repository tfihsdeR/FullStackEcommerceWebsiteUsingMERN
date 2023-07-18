import React, { Fragment } from 'react'

function header() {
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand" style={{ display: "flex", justifyContent: "center" }}>
                        <img src='/images/MERNStackImage.webp' className="img-fluid" style={{ maxHeight: "90px" }} />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <div className="input-group">
                        <input type="text" id="search_field" className="form-control" placeholder="Enter Product Name ..." />
                        <div className="input-group-append">
                            <button id="search_btn" className="btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
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

export default header