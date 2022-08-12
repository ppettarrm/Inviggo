import React from "react";

import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = props => {
  if (props.items?.length === 0) {
    return (
      <div className="center">
        <h2>No products found.</h2>
      </div>
    );
  }

  return (
    <ul className='products-list'>
      {props.items?.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
            category={product.category}
            username={product.username}
            city={product.city}
            date={product.date}
          />
      ))}
    </ul>
  );
};

export default ProductList;
