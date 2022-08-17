import React, { useEffect, useState } from "react";

import ProductList from "../components/ProductList";

const Products = () => {
  const [error, setError] = useState();
  const [loadedProducts, setLoadedProducts] = useState();

  useEffect(() => {
    const sendReq = async () => {
      try{
      const response = await fetch("http://localhost:5000/api/products");
      const responseData = await response.json();

      if(!response.ok){
        throw new Error(responseData.message)
      }

      setLoadedProducts(responseData.products);
      } catch(error){
        setError(error.message);
      }
      
    };

    sendReq();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return <ProductList items={loadedProducts} />;
};

export default Products;
