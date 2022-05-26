import React from "react";
import "./Favourite.css";
import { useSelector, useDispatch } from "react-redux";
// import {
//   deleteFavouriteItemsToCart,
//   deleteOfferFavouriteItemsToCart,
// } from "../../actions/FavouriteAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../more/Loading";
//import { useState } from "react";
import BottomTab from "../../more/BottomTab";
import MetaData from "../../more/Metadata";
import FavouriteItemsCard from "./FavouriteItemsCard";
import { deleteFavouriteItemsToCart } from "../../actions/FavouriteAction";

const Favourite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Favourites Items" />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Items In Favourites</Typography>
              <Link to="/products">View Products</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="favouritesPage">
                <div className="favouritesHeader">
                  <p>Product</p>
                  <p>Price</p>
                  <p>Stock Status</p>
                  <p>Action</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
                <BottomTab />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Favourite;
