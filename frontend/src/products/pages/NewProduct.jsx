import React, {useState} from "react";

import Button from "../../shared/components/FormElements/Button";
import "./NewProduct.css";

const NewProduct = () => {

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

  return (
    <form className="place-form" onSubmit={productSubmitHandler}>
      <div className="nproduct-name">
        <label>Product name:</label>
        <input name="pname" type="text" required onChange={pname => setPname(pname.target.value)}/>
      </div>
      <div className="nproduct-image">
        <label>Product image:</label>
        <input name="image" type="url" required onChange={image => setImage(image.target.value)}/>
      </div>
      <div className="nproduct-category">
        <label>Product price:</label>
        <input name="price" type="text" required onChange={price => setPrice(price.target.value)}/>
      </div>
      <div className="nproduct-category">
        <label>Product category:</label>
        <input name="category" type="text" required onChange={category => setCategory(category.target.value)}/>
      </div>
      <div className="nproduct-city">
        <label>City:</label>
        <input name="city" type="text" required onChange={city => setCity(city.target.value)}/>
      </div>
      <div className="nproduct-description">
        <label>Description:</label>
        <textarea name="description" required onChange={description => setDescription(description.target.value)}/>
      </div>
      <div className="nproduct-date">
        <label>Date:</label>
        <input name="date" type="date" required onChange={date => setDate(date.target.value)}/>
      </div>
      <Button type="submit">ADD</Button>
    </form>
  );
};

export default NewProduct;
