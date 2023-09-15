import React, { useEffect, useState } from "react";
import "./ViewProduct.scss";
import { Link } from "react-router-dom";
import edit from "../../../assets/img/edit.png";
import trash from "../../../assets/img/trash.png";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProduct } from "../../../store/slice/storeSlice";
import Loader from "../../../Loader/Loader";
import useFetchProductList from "../../../customHooks/useFetchProductList";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/Config";
import { deleteDoc, doc } from "firebase/firestore";

const ViewProduct = () => {
  const { displayList } = useFetchProductList("products");
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: displayList }));
  }, [dispatch, displayList, products]);

  const onDelete = async (id, imageUrl) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "products", id));
      const productRef = ref(storage, imageUrl);
      await deleteObject(productRef);
      setIsLoading(false);
      toast.success("Product deleted");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="view">
        <div className="view__products">
          <h2 className="view__title">All Products</h2>
          {displayList.length === 0 ? (
            <p>No products in database</p>
          ) : (
            <table className="view__table">
              <thead className="view__thead">
                <tr className="view__tr">
                  <th className="view__th">N°</th>
                  <th className="view__th">Image</th>
                  <th className="view__th">Name</th>
                  <th className="view__th">Category</th>
                  <th className="view__th">Price</th>
                  <th className="view__th">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {displayList.map((list, index) => {
                  const { id, name, price, imageUrl, category } = list;
                  return (
                    <tr key={id} className="view__tr">
                      <td className="view__td">{index + 1}</td>
                      <td className="view__td">
                        <img
                          className="view__img"
                          src={imageUrl}
                          alt="imageUrl"
                        />
                      </td>
                      <td className="view__td">{name}</td>
                      <td className="view__td">{category}</td>
                      <td className="view__td">{`${price}€`}</td>
                      <td className="view__td view__td--icon">
                        <div className="view__container-icon">
                          <Link to={`/admin/product/${id}`}>
                            <img
                              className="view__icon"
                              src={edit}
                              alt="edit-icon"
                            />
                          </Link>
                          <img
                            onClick={() => onDelete(id, imageUrl)}
                            className="view__icon"
                            src={trash}
                            alt="trash-icon"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewProduct;
