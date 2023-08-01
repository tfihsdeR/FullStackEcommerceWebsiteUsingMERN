import './App.css';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login.jsx';
import Register from './components/user/Register.jsx';

function App() {
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
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;