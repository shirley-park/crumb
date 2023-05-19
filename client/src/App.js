import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './scenes/home/Home'
import ProductDetails from './scenes/productDetails/ProductDetails'
import Checkout from './scenes/checkout/Checkout'
import CheckoutSuccess from './scenes/checkout/CheckoutSuccess'
import Navbar from './scenes/global/Navbar'
import ShoppingCart from './scenes/global/ShoppingCart'
import Footer from './scenes/global/Footer'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
        </Routes>
        <ShoppingCart />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
