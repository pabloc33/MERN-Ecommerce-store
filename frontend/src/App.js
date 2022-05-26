import "./App.css";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./component/Products/ProductDetails";
import LoginSignup from "./component/Authentication/LoginSignup";
import UserData from "./more/UserData";
import Store from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import EditProfile from "./component/user/EditProfile";
import About from "./component/about/About";
import Products from "./component/Products/Products";
import Search from "./component/Products/Search";
import Support from "./more/Support";
import Cart from "./component/cart/Cart";
import Favourite from "./component/cart/Favourites";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/cart/Payment";
import Success from "./component/cart/Success";
import MoreOption from "./component/user/MoreOption";
import Dashboard from "./component/Admin/Dashboard";
import CreateProduct from "./component/Admin/CreateProduct";
import AllProducts from "./component/Admin/AllProducts";
import EditProduct from "./component/Admin/EditProduct";
import AllOrder from "./component/Admin/AllOrder";
import UpdateOrder from "./component/Admin/UpdateOrder";
import AllUsers from "./component/Admin/AllUsers";
import UpdateUser from "./component/Admin/UpdateUser";
import AllReviews from "./component/Admin/AllReviews";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Notfound from "./more/Notfound";
import MyOrder from "./component/user/MyOrder";
import MyOrderDetails from "./component/user/MyOrderDetails";
import CommingSoon from "./more/CommingSoon";
import Rules from "./more/Rules";
import Contact from "./more/Contact";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      {isAuthenticated && <UserData user={user} />}
      <Routes>
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/creator" element={<CommingSoon />} />
        <Route path="/faq" element={<Rules />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/more" element={<MoreOption />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update/info"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <MyOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllReviews />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
