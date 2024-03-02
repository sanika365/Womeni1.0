
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import mongoose from "mongoose";
// import Order from "@/models/Order";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(localStorage.getItem("myuser")).token,
          }),
        });

        let res = await a.json();
        setOrders(res.orders);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, [router.query]);
  return (
    <div className='m-2 p-2'>
      <h2>My Orders</h2>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#Order Id</th>
              <th scope='col'>Email</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Details</th>
              {/* <th scope="col">Heading</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr key={item._id}>
                  <th scope='row'>{item.orderId}</th>
                  <td>{item.email}</td>
                  <td>{item.amount}</td>
                  <td>
                    <Link href={"/order?id=" + item._id} legacyBehavior>
                      <a>Details</a>
                    </Link>
                  </td>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }
//   let orders = await Order.find({});

//   return {
//     props: { orders: orders },
//   };
// }

export default Orders;