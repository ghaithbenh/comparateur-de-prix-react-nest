import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Main from "./Main";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Row = ({ rowID, data }) => {
  const slideLeft = () => {
    var slider = document.getElementById(`slider` + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById(`slider` + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [product, setProduct] = useState([]);

  const SetProducts = async () => {
    {
      await axios
        .get("http://localhost:3333/products/product/products", {
          withCredentials: true,
        })
        .then((res) => setProduct(res.data));
    }
    useEffect(() => {
      SetProducts();
    }, []);
  };

  return (
    <div>
      <h2 className="text-black font-bold md:text-xl p-4 "> {data.product} </h2>
      <div className="relative flex items-center group">
        <h2>{data.product}</h2>
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full  absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0"
        />

        <div
          id={`slider` + rowID}
          className="w-full h-full overflow-x-scroll scrollbar-hide  whitespace-nowrap scroll-smooth  relative  "
        >
          {data.map((item, id) => {
            return <Main key={id} item={item} />;
          })}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
        />
      </div>
    </div>
  );
};

export default Row;
