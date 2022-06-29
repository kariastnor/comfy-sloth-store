import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const allPrices = action.payload.map((prod) => prod.price);
      const maxPrice = Math.max(...allPrices);
      return {
        ...state,
        // Spread operator to copy values from products array, to avoid issues with memory (?) if just passing in the array straight
        filteredProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filteredProducts } = state;
      let sortedProds = [...filteredProducts];
      if (sort === "name-a") {
        sortedProds = sortedProds.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        sortedProds = sortedProds.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      if (sort === "price-lowest") {
        sortedProds = sortedProds.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        sortedProds = sortedProds.sort((a, b) => b.price - a.price);
      }
      return { ...state, filteredProducts: sortedProds };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case FILTER_PRODUCTS:
      const { text, company, category, color, price, shipping } = state.filters;
      let tempProducts = [...state.allProducts];
      if (text) {
        tempProducts = tempProducts.filter((prod) =>
          prod.name.toLowerCase().includes(text)
        );
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (prod) => prod.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter((prod) => prod.company === company);
      }
      if (color !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          // return prod.colors.find((col) => col === color);
          return prod.colors.includes(color);
        });
      }
      if (shipping) {
        tempProducts = tempProducts.filter((prod) => prod.shipping === true);
      }
      tempProducts = tempProducts.filter((prod) => prod.price <= price);
      return { ...state, filteredProducts: tempProducts };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.maxPrice,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
