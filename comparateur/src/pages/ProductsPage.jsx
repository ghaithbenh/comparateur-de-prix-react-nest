import React from "react";
import Row from "../components/row";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const ProductsPage = () => {
  const [telephone, setTelephone] = useState([]);
  const [montre, setMontre] = useState([]);
  const [accessories, setAccessories] = useState([]);

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

  return (
    <div>
      <Navbar />

      <Row rowID="1" title="telephone" data={telephone} />
      <Row rowID="2" title="ecouteurs" data={accessories} />
      <Row rowID="3" title="montre" data={montre} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default ProductsPage;
