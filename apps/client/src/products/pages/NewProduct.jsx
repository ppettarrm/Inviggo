import React, { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewProduct.css";

const NewProduct = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState();
  const [pname, setPname] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    const data = [
      {
        pname: pname,
        image: image,
        price: price,
        category: category,
        city: city,
        description: description,
      },
    ];

    try {
      const response = await fetch("http://localhost:5000/api/products/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        body: JSON.stringify({
          name: data[0].pname,
          description: data[0].description,
          image: data[0].image,
          price: data[0].price,
          category: data[0].category,
          userId: auth.userId,
          city: data[0].city,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong, please try again.");
    }
  };

  return (
    <form className="place-form" onSubmit={productSubmitHandler}>
      <div className="nproduct-name">
        <label>Product name:</label>
        <input
          name="pname"
          type="text"
          required
          onChange={(pname) => setPname(pname.target.value)}
        />
      </div>
      <div className="nproduct-image">
        <label>Product image:</label>
        <input
          name="image"
          type="url"
          required
          onChange={(image) => setImage(image.target.value)}
        />
      </div>
      <div className="nproduct-category">
        <label>Product price:</label>
        <input
          name="price"
          type="number"
          required
          onChange={(price) => setPrice(price.target.value)}
        />
      </div>
      <div className="nproduct-category">
        <label>Product category:</label>
        <select
          id="category"
          onChange={(category) => setCategory(category.target.value)}
        >
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
      <div className="nproduct-city">
        <label>City:</label>
        <input
          name="city"
          type="text"
          required
          onChange={(city) => setCity(city.target.value)}
        />
      </div>
      <div className="nproduct-description">
        <label>Description:</label>
        <textarea
          name="description"
          required
          onChange={(description) => setDescription(description.target.value)}
        />
      </div>
      {error && <h4>{error}</h4>}
      <Button type="submit">ADD</Button>
    </form>
  );
};

export default NewProduct;
