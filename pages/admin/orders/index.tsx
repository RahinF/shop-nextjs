import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import orderStatus from "../../../data/orderStatus";
import useOrder from "../../../hooks/useOrder";
import { fetchOrders } from "../../../services/order";
import toPrice from "../../../utils/toPrice";

const Orders = () => {
  const { orders, updateOrderStatusMutation } = useOrder();

  const [status] = useState<string[]>(orderStatus.map((status) => status.text));

  const handleNextStage = async (id: string, currentStatus: string) => {
    if (currentStatus === status[status.length - 1]) return;

    const index = status.findIndex((status) => status === currentStatus);
    const nextStatus = status[index + 1];

    try {
      const response = await updateOrderStatusMutation.mutateAsync({
        id,
        status: nextStatus,
      });
      toast.success(response.message);
    } catch (error) {
      toast.error("Couldn't update order status.");
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <Head>
        <title>Admin - Orders</title>
        <meta name="description" content="shows orders and actions to create and modify them" />
      </Head>

      <header>
        <h1 className="text-3xl font-bold uppercase">orders</h1>
      </header>

      <table className="table w-full">
        <thead>
          <tr>
            <td>id</td>
            <td>customer</td>
            <td>address</td>
            <td>status</td>
            <td>total price</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>{toPrice(order.total)}</td>
              <td>
                <button
                  className="btn"
                  disabled={order.status === status[status.length - 1]}
                  onClick={() => handleNextStage(order._id, order.status)}
                >
                  next stage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["orders"], fetchOrders);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Orders;
