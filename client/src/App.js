import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { loadLoggedUser } from './redux/usersRedux';
import { loadProductsRequest } from './redux/productsRedux';

import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import ProductDetails from './components/pages/ProductDetails/ProductDetails';
import Cart from './components/pages/Cart/Cart';
import ProceedOrder from './components/pages/ProceedOrder/ProceedOrder';
import Orders from './components/pages/Orders/Orders';
import OrderDetails from './components/pages/OrderDetails/OrderDetails';
import About from './components/pages/About/About';
import NotFound from './components/pages/NotFound/NotFound';
import Content from './components/layout/Content/Content';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLoggedUser());
    dispatch(loadProductsRequest());
  }, [dispatch]);

  return (
    <Content>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/proceed-order" element={<ProceedOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Content>
  );
};

export default App;
