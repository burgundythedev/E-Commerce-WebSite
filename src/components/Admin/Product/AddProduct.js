import React, { useState } from "react";
import storage, { db } from "../../../firebase/Config";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../store/slice/storeSlice";
import Loader from "../../../Loader/Loader";

const categories = [
  { id: 1, name: "Sneakers" },
  { id: 2, name: "City Lifestyle" },
  { id: 3, name: "Art" },
  { id: 4, name: "Orignal collab" },
];

const initialProductState = {
  name: "",
  description: "",
  price: "",
  brand: "",
  imageUrl: "",
  category: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const productSelector = useSelector(selectProduct);

  const productEdit = productSelector.find((item) => item.id === id);
  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  };
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialProductState }, productEdit);
    return newState;
  });
  const currentProduct = product || initialProductState;

  const navigate = useNavigate();
  const handleAddProductInput = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProductImage = (event) => {
    const file = event.target.files[0];
    const storageUp = getStorage(storage);
    const storageRef = ref(storageUp, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Image uploaded with success");
        });
      }
    );
  };
  const onSubmitProductForm = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: product.category,
      });

      setProduct({ ...initialProductState });
      toast.success("Product added with success!");
      setIsLoading(false);
      navigate("/admin/viewproducts");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const onEditForm = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: product.category,
      });
      setIsLoading(false);
      toast.success("Product updated");
      navigate("/admin/viewproducts");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="addproduct">
        <h2 className="addproduct__title">
          {detectForm(id, "Add New Product", "Edit Product")}
        </h2>
        <div className="addproduct__container">
          <form
            onSubmit={detectForm(id, onSubmitProductForm, onEditForm)}
            className="addproduct__form"
          >
            <div className="addproduct__container">
              <label className="addproduct__label">Produt Name</label>
              <input
                type="text"
                placeholder="Product Name"
                required
                name="name"
                value={currentProduct.name}
                className="addproduct__input"
                onChange={handleAddProductInput}
              />
            </div>
            <div className="addproduct__container">
              <label className="addproduct_label">Product Image</label>
              {uploadProgress > 0 && (
                <p className="progress">{uploadProgress}%</p>
              )}
              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={handleAddProductImage}
                className="addproduct__input"
              />
              {currentProduct.imageUrl === "" ? null : (
                <input
                  type="text"
                  placeholder="image URL"
                  name="imageUrl"
                  disabled
                  value={currentProduct.imageUrl}
                  className="addproduct__input"
                />
              )}
            </div>
            <div className="addproduct__container">
              <label className="addproduct__label">Produt Price</label>
              <input
                type="text"
                placeholder="Product Price"
                required
                name="price"
                value={currentProduct.price}
                className="addproduct__input"
                onChange={handleAddProductInput}
              />
            </div>
            <div className="addproduct__container">
              <label htmlFor="category-select">Choose a category</label>
              <select
                value={currentProduct.category}
                onChange={handleAddProductInput}
                name="category"
                id="category-select"
              >
                <option value="" disabled>
                  - Please choose an option -
                </option>
                {categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="addproduct__container">
              <label className="addproduct__label">Produt Brand</label>
              <input
                type="text"
                placeholder="Product Brand"
                required
                name="brand"
                value={currentProduct.brand}
                className="addproduct__input"
                onChange={handleAddProductInput}
              />
            </div>
            <div className="addproduct__container">
              <label className="addproduct__label">Description</label>
              <textarea
                cols="25"
                rows="10"
                required
                name="description"
                value={currentProduct.description}
                className="addproduct__input"
                onChange={handleAddProductInput}
              ></textarea>
            </div>
            <div className="addproduct__container">
              <button className="addproduct__button" type="submit">
                {detectForm(id, " Upload Product", "Edit Product")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
