import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const FilterContext = React.createContext();

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "name-a",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  function setGridView() {
    dispatch({ type: SET_GRIDVIEW });
  }

  function setListView() {
    dispatch({ type: SET_LISTVIEW });
  }

  function updateSort(event) {
    const { value } = event.target;
    dispatch({ type: UPDATE_SORT, payload: value });
  }

  function updateFilters(event) {
    let { name, value } = event.target;
    if (name === "category") {
      value = event.target.textContent;
    }
    if (name === "color") {
      value = event.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = event.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }

  function clearFilters() {
    dispatch({ type: CLEAR_FILTERS });
  }

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.filters]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.filters, state.sort]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
