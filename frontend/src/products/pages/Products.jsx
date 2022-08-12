import React from "react";

import ProductList from "../components/ProductList";

const Products = () => {
  const PROD = [
    {
      id: "p1",
      name: "Computer",
      description: "Fast and modern computer.",
      image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
      price: '40.000 din.',
      category: "Technology",
      username: "u1",
      city: "Novi Sad",
      date: "12.08.2022.",
    },
    {
        id: "p2",
        name: "Computer",
        description: "Fast and modern computer.",
        image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
        price: '40.000 din.',
        category: "Technology",
        username: "u1",
        city: "Novi Sad",
        date: "12.08.2022.",
      },
      {
        id: "p3",
        name: "Computer",
        description: "Fast and modern computer.",
        image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
        price: '40.000 din.',
        category: "Technology",
        username: "u1",
        city: "Novi Sad",
        date: "12.08.2022.",
      }, 
      {
        id: "p4",
        name: "Computer",
        description: "Fast and modern computer.",
        image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
        price: '40.000 din.',
        category: "Technology",
        username: "u1",
        city: "Novi Sad",
        date: "12.08.2022.",
      },
      {
          id: "p5",
          name: "Computer",
          description: "Fast and modern computer.",
          image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
          price: '40.000 din.',
          category: "Technology",
          username: "u1",
          city: "Novi Sad",
          date: "12.08.2022.",
        },
        {
          id: "p6",
          name: "Computer",
          description: "Fast and modern computer.",
          image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
          price: '40.000 din.',
          category: "Technology",
          username: "u1",
          city: "Novi Sad",
          date: "12.08.2022.",
        }
  ];

  return <ProductList items={PROD} />;
};

export default Products;
