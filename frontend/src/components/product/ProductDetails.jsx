import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { useParams } from 'react-router-dom'
import { Carousel } from "react-bootstrap"

import Loader from "../layout/Loader"
import MetaData from "../layout/MetaData"
import { getProductDetails, clearErrors, createReview } from "../../actions/productActions"
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from "../../constants/productConstants"
import ListOfReviews from '../review/ListOfReviews'

function ProductDetails() {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    let { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Review posted successfully.")
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, id, reviewError, success])

    const increaseQuantity = () => {
        const count = document.querySelector(".count")

        if (count.valueAsNumber >= product.stock) return
        const _quantity = count.valueAsNumber + 1
        setQuantity(_quantity)
    }

    const decreaseQuantity = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber <= 1) return;
        const _quantity = count.valueAsNumber - 1;
        setQuantity(_quantity);
    };

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity))
        alert.success("Item added to the cart.")
    }

    const setUserRatings = () => {
        const stars = document.querySelectorAll(".star i")

        stars.forEach((star, index) => {
            star.setAttribute("starValue", index + 1);

            ["click", "mouseover", "mouseout"].forEach(function (e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {
            const selectedStarValue = parseInt(e.target.getAttribute("starValue"));
            stars.forEach((star, index) => {
                if (e.type === "click") {
                    if (index < selectedStarValue) {
                        star.classList.add("orange");

                        setRating(selectedStarValue)
                    } else {
                        star.classList.remove("orange");
                    }
                }

                if (e.type === "mouseover") {
                    if (index < selectedStarValue) {
                        star.classList.add("yellow");
                    } else {
                        star.classList.remove("yellow");
                    }
                }

                if (e.type === "mouseout") {
                    star.classList.remove("yellow");
                }
            });
        }
    }

    const reviewSubmitHandler = () => {
        const formData = new FormData()
        formData.set("rating", rating)
        formData.set("comment", comment)
        formData.set("productId", id)

        dispatch(createReview(formData))
        handleClose()
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const handleShow = () => {
        setShowModal(true)
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product ? product.name : null} />
                    {
                        product && (
                            <Fragment>
                                <div className="row f-flex justify-content-around">
                                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                        <Carousel pause="hover">
                                            {
                                                product.images && product.images.map(image => (
                                                    <Carousel.Item key={image.public_id}>
                                                        <img className='d-block w-100' src={image.url} alt={product.title} />
                                                    </Carousel.Item>
                                                ))
                                            }
                                        </Carousel>
                                    </div>

                                    <div className="col-12 col-lg-5 mt-5">
                                        <h3>{product ? product.name : null}</h3>
                                        <p id="product_id">Product # {product._id}</p>

                                        <hr />

                                        <div className="rating-outer">
                                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                        </div>
                                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                        <hr />

                                        <p id="product_price">${product.price}</p>
                                        <div className="stockCounter d-inline">
                                            <span className="btn btn-danger minus" onClick={decreaseQuantity}>-</span>

                                            <input type="number" className="form-control count d-inline" value={quantity.toString()} readOnly />

                                            <span className="btn btn-primary plus" onClick={increaseQuantity}>+</span>
                                        </div>
                                        <button
                                            type="button"
                                            id="cart_btn"
                                            className="btn btn-primary d-inline ml-4"
                                            onClick={addToCart}
                                            disabled={product.stock === 0}
                                        >
                                            Add to Cart
                                        </button>

                                        <hr />

                                        <p>Status: <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

                                        <hr />

                                        <h4 className="mt-2">Description:</h4>
                                        <p>{product.description}</p>
                                        <hr />
                                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                        {user && (
                                            <button
                                                id="review_btn"
                                                type="button"
                                                className="btn btn-primary mt-4"
                                                onClick={() => {
                                                    handleShow()
                                                    setUserRatings()
                                                }}
                                            >
                                                Submit Your Review
                                            </button>
                                        )}

                                        <div className="row mt-2 mb-5">
                                            <div className="rating w-50">
                                                <div
                                                    className={`modal fade ${showModal ? 'show' : ''}`}
                                                    id="ratingModal"
                                                    tabIndex="-1"
                                                    role="dialog"
                                                    aria-labelledby="ratingModalLabel"
                                                    style={{ display: showModal ? 'block' : 'none' }}
                                                >
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="ratingModalLabel">
                                                                    Submit Review
                                                                </h5>
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                    onClick={handleClose}
                                                                >
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <ul className="stars d-flex flex-">
                                                                    <li className="star"><i className="fa fa-star iconStar"></i></li>
                                                                    <li className="star"><i className="fa fa-star iconStar"></i></li>
                                                                    <li className="star"><i className="fa fa-star iconStar"></i></li>
                                                                    <li className="star"><i className="fa fa-star iconStar"></i></li>
                                                                    <li className="star"><i className="fa fa-star iconStar"></i></li>
                                                                </ul>

                                                                <textarea
                                                                    name="review"
                                                                    id="review"
                                                                    className="form-control mt-3"
                                                                    onChange={e => setComment(e.target.value)}
                                                                ></textarea>

                                                                <button
                                                                    className="btn my-3 float-right review-btn px-4 text-white"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                    onClick={reviewSubmitHandler}
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >

                                {
                                    product.reviews && product.reviews.length > 0 && (
                                        <ListOfReviews reviews={product.reviews} />
                                    )
                                }
                            </Fragment>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails