import React, { useState, useContext } from "react";

import ProductItem from "./ProductItem";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProductList.css";

const ProductList = (props) => {
  const [showMyProducts, setShowMyProducts] = useState(false);
  const [priceFilter, setPriceFilter] = useState(999999);
  const auth = useContext(AuthContext);

  if (props.items?.length === 0) {
    return (
      <div className="center">
        <h2>No products found.</h2>
      </div>
    );
  }

  const myProductsOnly = () => {
    setShowMyProducts(!myProducts);
  };

  const currentPrice = () => {
    setPriceFilter();
  };

  const allProducts = props.items?.sort((a, b) => a.date > b.date).map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      description={product.description}
      image={product.image}
      price={product.price}
      category={product.category}
      userId={product.userId}
      city={product.city}
      date={product.date}
    />
  ));

  let pagCountProd = 0;
  let pagPage = 1;
  return (
    <React.Fragment>
      <div className="filteri">
        <div className="filter-search">
          <label htmlFor="search-input">Search: </label>
          <input type="search" name="search-input" />
          <button>Search</button>
        </div>
        <div className="filter-category">
          <label htmlFor="category">Category filter: </label>
          <select id="category" name="category">
            <option value="Choose">Choose</option>
            <option value="Clothing">Clothing</option>
            <option value="Tools">Tools</option>
            <option value="Sports">Sports</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
            <option value="Pets">Pets</option>
            <option value="Games">Games</option>
            <option value="Books">Books</option>
            <option value="Technology">Technology</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="filter-price">
          <label htmlFor="price-input">Price range: </label>
          <input
            type="range"
            defaultValue="999999"
            name="price-input"
            min="0"
            max="999999"
            onChange={(price) => setPriceFilter(price.target.value)}
          />
          <label>Current: {priceFilter}</label>
        </div>
        {auth.username && (
          <div className="filter-myproducts">
            <label htmlFor="myproducts-input">My products: </label>
            <input
              type="checkbox"
              name="myproducts-input"
              onChange={myProductsOnly}
            />
          </div>
        )}
      </div>
      <ul className="products-list">
        {allProducts}
      </ul>
      <div className="paginacija-columns">
        <div></div>
        <div className="paginacija">
          <button id="previous">PREVIOUS</button>
          <button id="next">NEXT</button>
        </div>
        <div></div>
      </div>
      <div className="footer">
        <h2>Konkursni zadatak Inviggo - Petar Maletin</h2>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
