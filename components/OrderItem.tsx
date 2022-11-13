import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import ICartProduct from "../types/ICartProduct";
import IProduct from "../types/IProduct";

interface IOrderItem {
  orderItem: ICartProduct;
}

async function fetchProduct(id: string): Promise<IProduct> {
  return axios
    .get(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.data);
}

const OrderItem = ({ orderItem }: IOrderItem) => {
  const { data: product, isSuccess } = useQuery(
    ["order products"],
    () => fetchProduct(orderItem.id as string),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  if (!isSuccess) return <p>loading...</p>;
  return (
    <section className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex h-56 w-56 items-center">
        <Image
          src={"/images/pizza.png"}
          alt={`top view of ${product.title} pizza`}
          height={400}
          width={400}
          priority
        />
      </div>
      <header className="w-full max-w-xs">
        <h2 className="text-lg font-bold uppercase text-orange-400">
          {orderItem.quantity} {orderItem.size} {product.title}
        </h2>
        <h3 className="font-bold">Extras</h3>
        <p>{orderItem.extras.join(", ") || "none"}</p>
      </header>
    </section>
  );
};

export default OrderItem;
