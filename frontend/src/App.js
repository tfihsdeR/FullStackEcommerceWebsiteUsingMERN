import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import Home from './components/Home.jsx';
import ProductDetails from './components/product/ProductDetails.jsx';
import Login from './components/user/Login.jsx';
import Register from './components/user/Register.jsx';
import { loadUser } from './actions/userActions.jsx';
import store from './store.jsx';
import Profile from './components/user/Profile.jsx';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateUserProfile from './components/user/UpdateUserProfile';
import UpdatePassword from './components/user/UpdatePassword';

function App() {

    useEffect(() => {
        store.dispatch(loadUser());
    }, [])

    return (
        <div className="App">
            <Header />
            <div className='container container-fluid'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/search/:keyword' element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/user/profile/update" element={<ProtectedRoute element={<UpdateUserProfile />} />} />
                    <Route path="/user/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;