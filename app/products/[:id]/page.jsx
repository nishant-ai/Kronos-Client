"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const page = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);

  const handleSubmit = () => {
    axios.post("http://localhost:8000/api/sentiment/", {
      customer: localStorage.getItem("user_id"),
      comment: comment,
      product: product.id,
    });
  };

  const buyProduct = () => {
    axios.post("http://localhost:8000/api/sale/", {
      customer: localStorage.getItem("user_id"),
      quantity: qty,
      product: product.id,
    });
  };

  useEffect(() => {
    const productId = window.location.href.split("/")[4];
    axios.get(`http://localhost:8000/api/product/${productId}`).then((res) => {
      setProduct(res.data);
      axios
        .get(
          `http://localhost:8000/api/prod_comments?product=${productId}&sentiment=ALL`
        )
        .then((res) => {
          setComments(res.data);
        });
    });
  }, []);

  return (
    <div>
      <div>{product?.name}</div>
      <div>{product?.price}</div>
      <form method="POST" onSubmit={buyProduct}>
        <label>How many of {product?.name} you would like to buy?</label>
        <input
          className="rounded-md border border-blue-600 text-blue-600 px-3 py-2 mx-2 w-[5vw]"
          type="number"
          onChange={(e) => setQty(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 duration-200 px-3 py-2"
        >
          Buy Now
        </button>
      </form>
      <div>
        {comments.map((comment) => (
          <>
            <div>{comment?.customer_name}</div>
            <div>{comment?.comment}</div>
            <div>{comment?.sentiment}</div>
          </>
        ))}
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-blue-600 rounded-md px-2 py-2 my-2 mr-2"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 duration-200 px-3 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
