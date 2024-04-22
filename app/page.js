"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/customers")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-xl mb-5">Choose User You Want to Act As:</div>

      <div className="flex flex-col items-center">
        {users.map((user) => (
          <div
            className="w-[30vw] text-center border border-black rounded-md px-4 py-2 m-3 cursor-pointer hover:text-white hover:bg-black duration-200"
            onClick={() => {
              setActiveUser(user);
              localStorage.setItem("user_id", user.id);
            }}
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p>Active User ID: {activeUser?.id}</p>
        <p>Active User Name: {activeUser?.name}</p>
        <p>Active User Age: {activeUser?.age}</p>
        <p>Active User Location: {activeUser?.location}</p>
      </div>

      {activeUser ? (
        <Link href="/products">
          <button className="w-[30vw] text-center m-10 border text-blue-800 border-blue-800 rounded-md px-4 py-2 m-3 cursor-pointer hover:text-white hover:bg-blue-800 duration-200">
            Go Checkout Products
          </button>
        </Link>
      ) : (
        <button
          disabled
          className="w-[30vw] text-center m-10 border text-white bg-gray-400 border-gray-400 rounded-md px-4 py-2 m-3 cursor-not-allowed"
        >
          Choose User to Continue
        </button>
      )}
    </div>
  );
}
