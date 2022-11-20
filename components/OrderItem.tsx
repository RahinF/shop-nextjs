import Image from "next/image";
import useProduct from "../hooks/useProduct";
import ICartProduct from "../types/ICartProduct";

interface IOrderItem {
  orderItem: ICartProduct;
}

const OrderItem = ({ orderItem }: IOrderItem) => {
  const { product } = useProduct(orderItem.id);

  if (!product) return <p>loading...</p>;
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
        <h2 className="text-lg font-bold uppercase text-primary">
          {orderItem.quantity} x {product.title}
        </h2>
        <p className="capitalize">
          <span className="font-bold">base:</span> {orderItem.base}
        </p>

        <p className="max-w-prose">
          <span className="font-bold">Extras:</span>{" "}
          {orderItem.extras.join(", ") || "none"}
        </p>
      </header>
    </section>
  );
};

export default OrderItem;
