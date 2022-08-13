import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import "./DetailItem.css";

const DetailItem = (props) => {
  if (props.items?.length === 0) {
    return (
      <div className="center">
        <h2>Product is not found!</h2>
      </div>
    );
  }

  console.log({ props });
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="card">
        <div className="product-image">
          <img src={props.image} alt={props.id} />
        </div>
        <div className="product-content">
          <h3>Product name: {props.name}</h3>
          <h3>Price: {props.price}</h3>
          <h3>User: {props.username}</h3>
          <h4>Mobile: {props.mobile}</h4>
          <h4>City: {props.city}</h4>
          <h5>Category: {props.category}</h5>
          <h5>Date: {props.date}</h5>
          <h5>
            User {props.username} joined {props.userDate}
          </h5>
        </div>
        {auth.isLoggedIn && (<div className="product-buttons">
            <Button inverse to={`/products/update/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
        </div>)}
        <div className="product-description">
          <p>Description: {props.description}</p>
        </div>
      </div>
    </>
  );
};

export default DetailItem;
