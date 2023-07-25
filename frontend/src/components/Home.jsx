import React, { Fragment, useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../actions/productActions"
import { useAlert } from "react-alert"
import { useParams } from 'react-router-dom'
import ReactSlider from 'react-slider'

import MetaData from './layout/MetaData'
import Product from "./product/product"
import Loader from "./layout/Loader"
import "./home.css"

function Home() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])

    useEffect(() => {
        dispatch(getAllProducts(keyword, currentPage, price))

        if (error) {
            return alert.error(error)
        }

    }, [dispatch, error, alert, currentPage, keyword, price])

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
                                    keyword ? (
                                        <Fragment>
                                            <div className='col-6 col-md-3 mt-5 mb-5'>
                                                <div className="px-5">
                                                    <ReactSlider
                                                        className="horizontal-slider"
                                                        min={1}
                                                        max={1000}
                                                        thumbClassName="example-thumb"
                                                        trackClassName="example-track"
                                                        defaultValue={price}
                                                        ariaLabel={['Lower thumb', 'Upper thumb']}
                                                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                                        renderThumb={(props, state) => <div {...props}>{state.valueNow + "$"}</div>}
                                                        pearling
                                                        minDistance={10}
                                                        onAfterChange={(value, index) => setPrice(value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-6 col-md-9'>
                                                <div className='row'>
                                                    {
                                                        products && products.map(product => (
                                                            <Product key={product._id} product={product} col={4} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        products && products.map(product => (
                                            <Product key={product._id} product={product} col={3} />
                                        ))
                                    )
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