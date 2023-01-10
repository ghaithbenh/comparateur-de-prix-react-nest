import { FaHeart, FaRegHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyModal from "./MyModal";

export const trancateString = (string) => {
  if (string.length > 15) {
    return string.substring(0, 15) + "...";
  } else {
    return string;
  }
};

// const produitsMoinsChers = produits
//     .filter((produit) => produit.price <= produitDePage!.price)
//     .filter((produit) => {
//       if (produitDePage?.manufacturer !== produit.manufacturer)
//         return produit._id !== produitDePage!._id;

const Main = ({ item }) => {
  const [like, setLike] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [telephone, setTelephone] = useState([]);
  const [ecouteurs, setAccessories] = useState([]);
  const [montre, setMontre] = useState([]);

  const SetTelephoneProducts = async () => {
    await axios
      .get("http://localhost:3333/products/product/telephone", {
        withCredentials: true,
      })
      .then((res) => setTelephone(res.data));
  };

  useEffect(() => {
    SetTelephoneProducts();
  }, []);
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

  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      {/* <h2>{item.product}</h2> */}
      <div
        onClick={() => setShowModal(!showModal)}
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      >
        {/* <h2>{item.product}</h2> */}
        <MyModal
          setShowModal={() => {
            setShowModal(!showModal);
          }}
          item={item}
          showModal={showModal}
        />
        {/* <h2>{item.product}</h2> */}
        <img
          className="w-full h-auto block "
          src={item.imgSRC}
          alt={trancateString(item.title)}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="relative white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full w-full text-center">
            {trancateString(item.title)}
            <br />

            {item.price}

            {/* <br />

            {item.manefacturer} */}
          </p>

          <p>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
};
export default Main;
// const products = products[Math.floor(Math.random() * products.length)];
