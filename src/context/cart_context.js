import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

function getLocalStorage() {
  let cart = localStorage.getItem("cart-comfyslothstore-257xu");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addToCart(id, color, amount, product) {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }

  function removeItem(id) {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  }

  function toggleAmount(id, value) {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  }

  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  useEffect(() => {
    localStorage.setItem(
      "cart-comfyslothstore-257xu",
      JSON.stringify(state.cart)
    );
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
