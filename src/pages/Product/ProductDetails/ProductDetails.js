import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/Config";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dataItem = { id: id, ...docSnap.data() };
      setProduct(dataItem);
    } else {
      toast.error("Can't display Product Details");
    }
  };

  useEffect(() => {
    getProduct();
  });

  return (
    <div className="details">
      <div className="details__container">
        <h2>Details</h2>
        <div>
          <Link to="/products">Back to Products</Link>
        </div>
        {product === null ? (
          <Loader />
        ) : (
          <div>
            <div className="details__container-img">
              <img
                className="details__img"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="details__content">
              <div className="details__details">
                <p className="details__price">{product.price}$</p>
                <h4 className="details__name">{product.name}</h4>
                <p className="details__name">{product.brand}</p>
                <p className="details__name">{product.category}</p>
              </div>
              <p className="details__description">{product.description}</p>
              <div className="details__add">
                <button className="details__incremente">+</button>
                <p className="details__number">1</p>
                <button className="details__decremente">-</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
