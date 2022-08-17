import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailItem from "../components/DetailItem";
import "./ProductDetail.css";

const ProductDetail = () => {
  const productId = useParams().productId;
  const [loadedProduct, setLoadedProduct] = useState("");
  const [error, setError] = useState("");
  const sendReq = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setLoadedProduct(responseData.product);
    } catch (error) {
      setError(error.message);
    }
  };

  sendReq();

  return (
    <DetailItem
      name={loadedProduct.name}
      description={loadedProduct.description}
      image={loadedProduct.image}
      price={loadedProduct.price}
      category={loadedProduct.category}
      username={loadedProduct.username}
      city={loadedProduct.city}
      date={loadedProduct.date}
    />
  );
};

export default ProductDetail;
