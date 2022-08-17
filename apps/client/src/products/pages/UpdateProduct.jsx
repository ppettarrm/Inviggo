import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";

const UpdateProduct = () => {
  let data;
  const productId = useParams().productId;
  const auth = useContext(AuthContext);
  const [error, setError] = useState();
  const [pname, setPname] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [loadedProduct, setLoadedProduct] = useState("");

  useEffect(() => {
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
        setPname(loadedProduct.name);
        setImage(loadedProduct.image);
        setPrice(loadedProduct.price);
        setCategory(loadedProduct.category);
        setCity(loadedProduct.city);
        setDescription(loadedProduct.description);
      } catch (error) {
        setError(error.message);
      }
    };

    sendReq();
  }, []);
  

  const productSubmitHandler = async (event) => {
    event.preventDefault();

    data = [
      {
        pname: pname,
        image: image,
        description: description,
        price: price,
        category: category,
        city: city,
      },
    ];

    console.log(auth.userId);
    try {
      console.log(loadedProduct);
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PATCH",
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
            city: data[0].city,
            userId: auth.userId,
          }),
        }
      );

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
    <div>
      <form className="place-form" onSubmit={productSubmitHandler}>
        <div className="nproduct-name">
          <label>Product name:</label>
          <input
            name="pname"
            type="text"
            defaultValue={loadedProduct.name}
            required
            onChange={(pname) => setPname(pname.target.value)}
          />
        </div>
        <div className="nproduct-image">
          <label>Product image:</label>
          <input
            name="image"
            type="url"
            defaultValue={loadedProduct.image}
            required
            onChange={(image) => setImage(image.target.value)}
          />
        </div>
        <div className="nproduct-category">
          <label>Product price:</label>
          <input
            name="price"
            type="number"
            defaultValue={loadedProduct.price}
            required
            onChange={(price) => setPrice(price.target.value)}
          />
        </div>
        <div className="nproduct-category">
          <label>Product category:</label>
          <select
            id="category"
            defaultValue={loadedProduct.category}
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
            defaultValue={loadedProduct.city}
            required
            onChange={(city) => setCity(city.target.value)}
          />
        </div>
        <div className="nproduct-description">
          <label>Description:</label>
          <textarea
            name="description"
            defaultValue={loadedProduct.description}
            required
            onChange={(description) => setDescription(description.target.value)}
          />
        </div>
        {error && <h4>{error}</h4>}
        <Button type="submit">UPDATE</Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
