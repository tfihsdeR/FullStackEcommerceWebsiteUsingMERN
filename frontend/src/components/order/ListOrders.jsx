import React, { Fragment, useEffect } from 'react'
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable } from "mdbreact"
import { Link } from "react-router-dom"


import { getUserOrders, clearErrors } from '../../actions/orderActions'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

function ListOrders() {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, orders, error } = useSelector(state => state.userOrders)

    useEffect(() => {
        dispatch(getUserOrders())

        if (error) {
            alert.error(error)

            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order Id",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: "numberOfItems",
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numberOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).toLowerCase().includes("delivered")
                    ? <p style={{ color: "green" }}>{order.orderStatus}</p>
                    : <p style={{ color: "red" }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/user/order/${order._id}`} className='btn btn-primary'>
                        <i className='fa fa-eye'></i>
                    </Link>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={"Order's List"} />

            <h1 className='my-5'>My Orders</h1>

            {
                loading ? <Loader /> : (
                    <MDBDataTable
                        data={setOrders()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                )
            }
        </Fragment>
    )
}

export default ListOrders