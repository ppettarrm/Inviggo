import React from "react";
import { useParams } from "react-router-dom";

import DetailItem from "../components/DetailItem";
import ProductItem from "../components/ProductItem";
import "./ProductDetail.css";

const PROD = [
  {
    id: "p1",
    name: "Gigatron Prime Lider Platinum",
    description:
      "Fast and modern computer. Proccessor: AMD Ryzen 3 RAM: 8GB DDR4 2666MHz SSD 480GB Graphics card: GeForce GTX 1050 Ti",
    image: "https://www.pinshop.rs/images/p/3/4/7/1/7/34717-main.png",
    price: "40.000 din.",
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
    price: "40.000 din.",
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
    price: "40.000 din.",
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
    price: "40.000 din.",
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
    price: "40.000 din.",
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
    price: "40.000 din.",
    category: "Technology",
    username: "u1",
    city: "Novi Sad",
    date: "12.08.2022.",
  },
];

const ProductDetail = () => {
  const productId = useParams().productId;
  const product = PROD.filter((products) => products.id === productId);

  return (
    <DetailItem
      key={product[0].id}
      id={product[0].id}
      name={product[0].name}
      description={product[0].description}
      image={product[0].image}
      price={product[0].price}
      category={product[0].category}
      username={product[0].username}
      city={product[0].city}
      date={product[0].date}
      userDate="13.2.2022."
      mobile="0614928377"
    />
  );
};

export default ProductDetail;