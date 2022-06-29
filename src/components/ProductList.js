import React from "react";
import { useFilterContext } from "../context/filter_context";
import { useProductsContext } from "../context/products_context";
import GridView from "./GridView";
import ListView from "./ListView";
import Loading from "./Loading";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();
  const { productsLoading } = useProductsContext();

  if (productsLoading) {
    return <Loading />;
  }
  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTranform: "none" }}>
        Sorry, no products matched your search
      </h5>
    );
  } else if (gridView) {
    return <GridView filteredProducts={filteredProducts} />;
  } else {
    return <ListView filteredProducts={filteredProducts} />;
  }
};

export default ProductList;
