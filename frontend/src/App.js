import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import Home from './components/Home.jsx';
import ProductDetails from './components/product/ProductDetails.jsx';
import Login from './components/user/Login.jsx';
import Register from './components/user/Register.jsx';
import { loadUser } from './actions/userActions.jsx';
import store from './store.jsx';
import Profile from './components/user/Profile.jsx';
import ProtectedRoute from './components/route/ProtectedRoute.jsx';
import UpdateUserProfile from './components/user/UpdateUserProfile.jsx';
import UpdatePassword from './components/user/UpdatePassword.jsx';
import ForgotPassword from './components/user/ForgotPassword.jsx';
import NewPassword from './components/user/NewPassword.jsx';
import Cart from './components/cart/Cart.jsx';
import Shipping from './components/cart/Shipping.jsx';
import ConfirmOrder from './components/cart/ConfirmOrder.jsx';
import Payment from './components/cart/Payment';
import ListOrders from './components/order/ListOrders.jsx';
import OrderDetails from './components/order/OrderDetails';


function App() {

    const [stripeApiKey, setStripeApiKey] = useState("")

    useEffect(() => {
        store.dispatch(loadUser());

        async function getStripeApiKey() {
            const { data } = await axios.get("/api/v1/stripeApi")
            setStripeApiKey(data.stripeApiKey)
        }

        getStripeApiKey()
    }, [])

    return (
        <div className="App">
            <Header />
            <div className='container container-fluid'>
                <Routes>
                    {/* General Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path='/search/:keyword' element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />

                    {/* Cart and Payment Routes */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
                    <Route path="/user/orders" element={<ProtectedRoute element={<ListOrders />} />} />
                    <Route path="/user/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />


                    <Route path="/confirmOrder" element={<ProtectedRoute element={<ConfirmOrder />} />} />
                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute element={
                                <React.Fragment>
                                    {stripeApiKey && (
                                        <Elements stripe={loadStripe(stripeApiKey)}>
                                            <Payment />
                                        </Elements>
                                    )}
                                </React.Fragment>
                            } />
                        }
                    />

                    {/* User Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/user/profile/update" element={<ProtectedRoute element={<UpdateUserProfile />} />} />
                    <Route path="/user/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
                    <Route path="/user/password/forgot" element={<ForgotPassword />} />
                    <Route path="/user/password/reset/:token" element={<NewPassword />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;