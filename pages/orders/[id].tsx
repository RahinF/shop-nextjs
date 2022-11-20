import { dehydrate, QueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { CheckCircle } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import OrderItem from "../../components/OrderItem";
import orderStatus from "../../data/orderStatus";
import useOrder from "../../hooks/useOrder";
import { fetchOrder } from "../../services/order";
import { IStatus } from "../../types/IOrder";
import toPrice from "../../utils/toPrice";

const Order = () => {
  const [completedStatus, setCompletedStatus] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const statuses: IStatus[] = useMemo(() => orderStatus, []);

  const router = useRouter();
  const { id } = router.query;

  const { order } = useOrder(id as string);

  useEffect(() => {
    if (!order) return;
    const completedStatus = statuses.findIndex(
      (status) => status.text === order.status
    );

    setCompletedStatus(completedStatus);
  }, [order, statuses]);

  useEffect(() => {
    if (!order) return;

    const total = order.products
      .map((product) => product.quantity!)
      .reduce((prev, current) => prev + current, 0);

    setTotalItems(total);
  }, [order]);

  if (!order) return <p>loading...</p>;

  return (
    <div className="flex flex-col justify-evenly gap-10 lg:flex-row">
       <Head>
            <title>Order Summary</title>
        </Head>

      <div>
        <h1 className="text-3xl font-bold uppercase">order summary</h1>

        <table className="table w-full">
          <tbody>
            <tr>
              <td>Order ID</td>
              <td>Customer</td>
              <td>Address</td>
            </tr>
            <tr>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10 flex max-w-md justify-evenly gap-2">
          {statuses.map((status, index) => {
            const isCompleted = completedStatus >= index;

            return (
              <div className="flex flex-col items-center" key={status.text}>
                <Image
                  src={status.src}
                  width={32}
                  height={32}
                  alt={status.alt}
                  className={clsx({ "opacity-50": !isCompleted })}
                />
                <span className={clsx({ "text-zinc-400": !isCompleted })}>
                  {status.text}
                </span>
                {isCompleted && (
                  <CheckCircle
                    size={24}
                    weight="fill"
                    className="text-green-400"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="my-10 text-xl font-bold uppercase">items</h2>
          {order.products.map((product) => (
            <OrderItem key={product.uuid} orderItem={product} />
          ))}
        </div>
      </div>
      <aside className="sticky top-28 flex h-min w-full max-w-xs flex-col items-stretch self-center bg-neutral p-4 text-white lg:self-start">
        <h1 className="mb-10 text-center text-xl font-bold uppercase">
          cart total
        </h1>
        <div className="flex justify-between text-lg">
          <p>Items:</p>
          <p>{totalItems}</p>
        </div>
        <div className="flex justify-between text-lg">
          <p>Total Price:</p>
          <p>{toPrice(order.total)}</p>
        </div>
        <button className="btn-primary btn mt-10 w-full max-w-sm">paid</button>
      </aside>
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const { params } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["order"], () => fetchOrder(params.id));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Order;
