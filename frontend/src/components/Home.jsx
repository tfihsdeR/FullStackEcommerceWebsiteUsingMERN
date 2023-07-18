import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Product from "./product/product"
import Loader from "./layout/Loader"

import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../actions/productActions"
import { useAlert, reactAlert } from "react-alert"

function Home() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, products, error, productsCounts } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
        }

        dispatch(getAllProducts())
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={"Buy Best Products Online"} />
                        <h1 id="products_heading">Latest Products</h1>

                        <section id="products" className="container mt-5">
                            <div className="row">
                                {
                                    products && products.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))
                                }
                            </div>
                        </section>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Home