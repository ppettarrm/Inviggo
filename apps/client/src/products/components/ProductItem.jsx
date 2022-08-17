import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import "./ProductItem.css";

const ProductItem = (props) => {
  const productId = useParams.productId;
  const auth = useContext(AuthContext);
  const [error, setError] = useState();

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${props.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmDelete = () => {
    let confirmAction = confirm("Deleting product! Are you sure?");
    if (confirmAction) {
      deleteHandler();
    }
  };

  return (
    <li>
      <Link to={`/products/${props.id}`}>
        <div className="card">
          <div className="product-item">
            <div className="product-item__image">
              <img src={props.image} alt={props.name} />
            </div>
            <h3 className="product-item__name">{props.name}</h3>
            <h3 className="product-item__price">{props.price} din.</h3>
            <h3 className="product-item__city">{props.city}</h3>
            <h3 className="product-item__category">{props.category}</h3>
            {auth.isLoggedIn && auth.userId === props.userId && (
              <div className="product-item__buttons">
                <Button inverse to={`/products/update/${props.id}`}>
                  EDIT
                </Button>
                <Link to={`/products/`} id="link">
                  <button
                    onClick={confirmDelete}
                    disabled={false}
                    id="delete-btn"
                  >
                    DELETE
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
