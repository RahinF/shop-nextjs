import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import orderStatus from "../../data/orderStatus";
import { fetchOrders, updateOrderStatus } from "../../services/order";
import { deleteProduct, fetchProducts } from "../../services/product";
import toPrice from "../../utils/toPrice";

type TTabs = "products" | "orders";

const Admin = () => {
  const queryClient = useQueryClient();
  const { data: orders } = useQuery(["orders"], fetchOrders, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: products } = useQuery(["products"], fetchProducts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);
      toast(`${response} deleted.`);
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const [status] = useState<string[]>(orderStatus.map((status) => status.text));

  const handleNextStage = (id: string, currentStatus: string) => {
    if (currentStatus === status[status.length - 1]) return;

    const index = status.findIndex((status) => status === currentStatus);
    const nextStatus = status[index + 1];

    updateOrderStatusMutation.mutate({ id, status: nextStatus });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  const [currentTab, setCurrentTab] = useState<TTabs>("products");
  const tabs: TTabs[] = ["products", "orders"];

  return (
    <div>
      <header className="mb-10 flex justify-between">
        <h1 className="text-3xl font-bold uppercase">{currentTab}</h1>

        <div className="tabs tabs-boxed">
          {tabs.map((tab) => (
            <button
              className={clsx("tab capitalize", {
                "tab-active": tab === currentTab,
              })}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {currentTab === "products" && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <td>Image</td>
                <td>id</td>
                <td>title</td>
                <td>base price</td>
                <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr>
                  <td>
                    <Image
                      src={product.image}
                      alt={`top view of ${product.title} pizza`}
                      height={100}
                      width={100}
                    />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>{toPrice(product.sizes[0].price)}</td>
                  <td className="space-x-2">
                    <button className="btn">edit</button>
                    <button
                      className="btn-error btn"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentTab === "orders" && (
        <div className="overflow-x-auto">
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
                <tr>
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
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["orders"], fetchOrders);
  await queryClient.prefetchQuery(["products"], fetchProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Admin;
