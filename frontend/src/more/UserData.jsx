import React, { useState } from "react";
import "./UserOption.css";
import profile from "../Assets/icons/Profile.png";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Support from "@material-ui/icons/ReportProblem";
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../actions/userAction";

const UserData = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scroolEffect = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".speedDial").classList.add("active");
    } else {
      document.querySelector(".speedDial").classList.remove("active");
    }
  });

  const dispatch = useDispatch();

  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{
            color: cartItems.length === 0 ? "" : "tomato",
          }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    {
      icon: (
        <HeartIcon
          style={{
            color: favouriteItems.length === 0 ? "" : "tomato",
          }}
        />
      ),
      name: `Favourite (${favouriteItems.length})`,
      func: favourite,
    },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <Support />, name: "Report us", func: report },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user.role === "Creator") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function home() {
    navigate("/");
  }
  function orders() {
    navigate("/orders");
  }
  function cart() {
    navigate("/cart");
  }
  function favourite() {
    navigate("/favourites");
  }
  function account() {
    navigate("/me");
  }

  function report() {
    navigate("/support");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        useRef={scroolEffect}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profile}
            alt="Profile"
            style={{
              position: "fixed",
            }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        ))}
      </SpeedDial>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UserData;
