import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';

function App() {
    return (
        <div className="App">
            <Header />
            <div className='container container-fluid'>
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path='/search/:keyword' element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;