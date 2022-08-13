import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  return (
    <li>
      <Link to={`/products/${props.id}`}>
        <div className="card">
          <div className="product-item">
            <div className="product-item__image">
              <img src={props.image} alt={props.name} />
            </div>
            <h3 className="product-item__name">{props.name}</h3>
            <h3 className="product-item__price">{props.price}</h3>
            <h3 className="product-item__city">{props.city}</h3>
            <h3 className="product-item__category">{props.category}</h3>
            {auth.isLoggedIn && (<div className="product-item__buttons">
              <Button inverse to={`/products/update/${props.id}`}>EDIT</Button>
              <Button danger>DELETE</Button>
            </div>)}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
