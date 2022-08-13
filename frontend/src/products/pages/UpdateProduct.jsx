import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";

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

const UpdateProduct = () => {
    const [pname, setPname] = useState(""); 
  const [image, setImage] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [city, setCity] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [date, setDate] = useState(""); 

  const productSubmitHandler = event => {
    event.preventDefault();
    const data = [
      {
        pname: pname,
        image: image,
        price: price,
        category: category,
        city: city,
        description: description,
        date: date
      }
    ]
    console.log(data)
  };


  const productId = useParams().productId;
  const identifiedProduct = PROD.find(p => p.id === productId)
  if(!identifiedProduct){
    return (
        <div className="center">
            <h2>Could not find product!</h2>
        </div>
    );
  }
  return (
    <form className="place-form" onSubmit={productSubmitHandler}>
      <div className="nproduct-name">
        <label>Product name:</label>
        <input name="pname" type="text" value={identifiedProduct.name} required onChange={pname => setPname(pname.target.value)}/>
      </div>
      <div className="nproduct-image">
        <label>Product image:</label>
        <input name="image" type="url" value={identifiedProduct.image} required onChange={image => setImage(image.target.value)}/>
      </div>
      <div className="nproduct-category">
        <label>Product price:</label>
        <input name="price" type="text" value={identifiedProduct.price} required onChange={price => setPrice(price.target.value)}/>
      </div>
      <div className="nproduct-category">
        <label>Product category:</label>
        <input name="category" type="text" value={identifiedProduct.category} required onChange={category => setCategory(category.target.value)}/>
      </div>
      <div className="nproduct-city">
        <label>City:</label>
        <input name="city" type="text" value={identifiedProduct.city} required onChange={city => setCity(city.target.value)}/>
      </div>
      <div className="nproduct-description">
        <label>Description:</label>
        <textarea name="description" value={identifiedProduct.description} required onChange={description => setDescription(description.target.value)}/>
      </div>
      <div className="nproduct-date">
        <label>Date:</label>
        <input name="date" type="date" required onChange={date => setDate(date.target.value)}/>
      </div>
      <Button type="submit">UPDATE</Button>
    </form>
  );
};

export default UpdateProduct;
