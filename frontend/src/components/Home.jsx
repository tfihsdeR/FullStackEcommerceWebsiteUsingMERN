import React, { Fragment, useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import MetaData from './layout/MetaData'
import Product from "./product/product"
import Loader from "./layout/Loader"

import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../actions/productActions"
import { useAlert, reactAlert } from "react-alert"

function Home() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getAllProducts(currentPage))

        if (error) {
            return alert.error(error)
        }

    }, [dispatch, error, alert, currentPage])

    const setCurrentPageNo = (pageNum) => {
        setCurrentPage(pageNum)
    }

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

                        {resPerPage <= productsCount && (
                            <div className='d-flex justify-content mt-5'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={parseInt(productsCount)}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Home