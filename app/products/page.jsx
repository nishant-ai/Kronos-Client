"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/").then((res) => {
      setProducts(res.data);
      console.log(products);
    });
  }, []);

  return (
    <>
      <div className="text-2xl m-5 font-semibold uppercase">Products</div>
      <div>
        {products.map((product) => {
          return (
            <div className="my-5 flex">
              <p className="mx-5 w-[15vw]">{product.name}</p>
              <p className="w-[15vw]">$ {product.price}</p>

              <Link href={`/products/${product.id}/`}>
                <button className="mx-10 border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white duration-200">
                  See Product
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
