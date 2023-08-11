import React, { Fragment, useEffect } from 'react'
import { useAlert } from "react-alert"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getUserOrderDetails, clearErrors } from '../../actions/orderActions'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

function OrderDetails() {

    const alert = useAlert()
    const dispatch = useDispatch()
    const { id } = useParams()

    const { loading, error, order } = useSelector(state => state.orderDetails)

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order || {}

    const isPaid = paymentInfo && paymentInfo.status.toLowerCase() == "succeeded" ? true : false

    const shippingFullAddress = shippingInfo && `${shippingInfo.address}
        , ${shippingInfo.city}
        , ${shippingInfo.postalCode}
        , ${shippingInfo.country}`

    useEffect(() => {
        dispatch(getUserOrderDetails(id))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, id, error, alert])

    return (
        <Fragment>
            <MetaData title={"Order Details"} />

            {
                loading ? <Loader /> : (
                    <Fragment>
                        <div className="container container-fluid">
                            <div className="row d-flex justify-content-between">
                                <div className="col-12 col-lg-8 mt-5 order-details">

                                    <h1 className="my-5">Order # {order._id}</h1>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name: </b>{user.name}</p>
                                    <p><b>Phone: </b>{shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address: </b>{shippingFullAddress}</p>
                                    <p><b>Amount: </b>${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "Paid" : "Not Paid"}</b></p>


                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={orderStatus && String(orderStatus).toLowerCase().includes("delivered")}><b>{orderStatus}</b></p>


                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {
                                            orderItems && orderItems.map(item => (
                                                <div className="row my-5" key={item.product}>
                                                    <div className="col-4 col-lg-2">
                                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                                    </div>

                                                    <div className="col-5 col-lg-5">
                                                        <Link to={`/product/${item.name}`}>{item.name}</Link>
                                                    </div>


                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p>${item.price}</p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p>{item.quantity} Piece(s)</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default OrderDetails