import React, { Fragment } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import MetaData from "../layout/MetaData"

function Cart() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)

    const checkOutHandler = () => {
        navigate("/login?redirect=shipping")
    }

    return (
        <Fragment>
            {
                cartItems.length === 0 ? <h2 className="mt-5">Your Cart is Empty</h2> : (
                    <Fragment>
                        <MetaData title={"Cart"} />
                        <div className="container container-fluid">
                            <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                            <div className="row d-flex justify-content-between">
                                <div className="col-12 col-lg-8">
                                    {
                                        cartItems.map(item => (
                                            <Fragment key={item.product}>
                                                <hr />
                                                <div className="cart-item">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-4 col-lg-3">
                                                            <img src={item.image} alt="Laptop" height="90" width="115" />
                                                        </div>

                                                        <div className="col-5 col-lg-3">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>


                                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p id="card_item_price">${item.price}</p>
                                                        </div>

                                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                            <div className="stockCounter d-inline">
                                                                <span className="btn btn-danger minus">-</span>
                                                                <input type="number" className="form-control count d-inline" value="1" readOnly />

                                                                <span className="btn btn-primary plus">+</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </Fragment>
                                        ))
                                    }
                                </div>

                                <div className="col-12 col-lg-3 my-4">
                                    <div id="order_summary">
                                        <h4>Order Summary</h4>
                                        <hr />
                                        <p>Subtotal: <span className="order-summary-values">3 (Units)</span></p>
                                        <p>Est. total: <span className="order-summary-values">$765.56</span></p>

                                        <hr />
                                        <button
                                            id="checkout_btn"
                                            className="btn btn-primary btn-block"
                                            onClick={checkOutHandler}
                                        >
                                            Check out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Cart