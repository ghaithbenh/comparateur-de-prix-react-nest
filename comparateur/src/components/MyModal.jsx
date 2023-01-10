import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "../components/row";
import { trancateString } from "./Main";

const MyModal = ({ showModal, item, setShowModal }) => {
  const [telephone, setTelephone] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [montre, setMontre] = useState([]);
  const [differentProducts, setDifferentProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchDifferentProducts = async () => {
    const allProducts = await axios
      .get("http://localhost:3333/products", { withCredentials: true })
      .then((res) => res.data);

    const similarProducts = allProducts
      .filter((product) => {
        if (product.product === item.product) {
          return product.price <= item.price;
        }
      })
      .slice(0, 6);

    setDifferentProducts(similarProducts);
  };

  const SetTelephoneProducts = async () => {
    await axios
      .get("http://localhost:3333/products/product/telephone", {
        withCredentials: true,
      })
      .then((res) => setTelephone(res.data));
  };

  useEffect(() => {
    SetTelephoneProducts();
    fetchDifferentProducts();
  }, [fetchDifferentProducts]);

  const SetMontreProducts = async () => {
    await axios
      .get("http://localhost:3333/products/product/montre", {
        withCredentials: true,
      })
      .then((res) => setMontre(res.data));
  };

  useEffect(() => {
    SetMontreProducts();
  }, []);

  const SetAccessoriesProducts = async () => {
    await axios
      .get("http://localhost:3333/products/product/accessories", {
        withCredentials: true,
      })
      .then((res) => setAccessories(res.data));
  };

  useEffect(() => {
    SetAccessoriesProducts();
  }, []);

  const findSimilarProducts = (item) => {
    if (item.product === "telephone") {
      return telephone
        .filter((product) => product.price <= item.price)
        .filter((product) => {
          if (item.manufacturer !== product.manufacturer)
            return product._id !== item._id;
        });
    } else if (item.product === "montre") {
      return montre
        .filter((product) => product.price <= item.price)
        .filter((product) => {
          if (item.manufacturer !== product.manufacturer)
            return product._id !== item._id;
        });
    } else if (item.product === "accessories") {
      return accessories
        .filter((product) => product.price <= item.price)
        .filter((product) => {
          if (item.manufacturer !== product.manufacturer)
            return product._id !== item._id;
        });
    }
  };

  return showModal ? (
    <div className="fixed  inset-0 bg-white bg-opacity-30 backdrop-blur-sm  flex justify-center items-center z-50  ">
      <div className="overflow-scroll h-[700px] bg-white p-2 rounded border border-gray-300 text-xl  ">
        <img className="h-60 w-60" src={item.imgSRC} alt={item.title} />
        <button
          onClick={() => {
            console.log(item._id);
            console.log(item.product);
            setShowModal();
          }}
        ></button>
        {item.title}
        <br />
        {item.price} DT
        <br />
        <a href={item.link}>
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            acheter maintenant
          </button>
        </a>
        <br />
        {/* {differentProducts.map((item) => (
          <img src={item.imgSRC} alt="" />
        ))} */}
        <div>
          <h1 className=" text-2xl font-bold ">Produit similaire</h1>
          <div className=" grid  grid-cols-1   sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2">
            {differentProducts.map((item) => {
              return (
                <div className="bg-white shadow-md rounded-lg ">
                  <div className="bg-cover bg-center h-56 p-4">
                    <a href={item.link}>
                      <img
                        className="h-60 w-60"
                        src={item.imgSRC}
                        alt={trancateString(item.title)}
                      />
                    </a>
                  </div>
                  <div className="p-4">
                    <h1 className="text-xl font-bold">
                      {trancateString(item.title)}
                    </h1>
                    <p className="mt-1 text-gray-600">{item.price} DT</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MyModal;
