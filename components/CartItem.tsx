import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import useCart from "../store/useCart";
import ICartProduct from "../types/ICartProduct";
import IProduct from "../types/IProduct";
import toPrice from "../utils/toPrice";

async function fetchProduct(id: string): Promise<IProduct> {
  return axios
    .get(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.data);
}

interface ICartItem {
  cartItem: ICartProduct;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const CartItem = ({ cartItem, setTotal }: ICartItem) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data: product, isSuccess } = useQuery(
    ["product"],
    () => fetchProduct(cartItem.id as string),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleIncreaseQuantity = () => {
    increaseQuantity(cartItem.uuid);
    setTotal((prev) => prev + unitPrice);
  };

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      decreaseQuantity(cartItem.uuid);
      setTotal((prev) => prev - unitPrice);
    } else {
      removeFromCart(cartItem.uuid);
    }
  };

  useEffect(() => {
    if (!isSuccess) return;

    const base = product.sizes.find((size) => size.text === cartItem.size)
      ?.price!;

    const extras: number = cartItem.extras
      .map((extra) => {
        const item = product.extras.find((e) => e.text === extra);
        return item ? item.price : 0;
      })
      .reduce((prev, current) => prev + current, 0);

    const unitPrice = base + extras;
    const totalPrice = unitPrice * cartItem.quantity;

    setUnitPrice(unitPrice);
    setTotalPrice(totalPrice);
  }, [isSuccess, cartItem, product]);

  useEffect(() => {
    setTotal((prev) => prev + totalPrice);
    return () => setTotal((prev) => prev - totalPrice);
  }, [setTotal, totalPrice]);

  if (!isSuccess) return <p>loading...</p>;

  return (
    <section className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <Head>
        <title>Shopping Cart</title>
        {/* add meta tags */}
      </Head>
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
          {cartItem.size} {product.title}
        </h2>
        <h3 className="font-bold">Extras</h3>
        <p>{cartItem.extras.join(", ") || "none"}</p>
        <p className="mt-2 text-lg font-bold">
          {toPrice(unitPrice * cartItem.quantity)}
        </p>
      </header>

      <div className="flex items-center gap-4">
        <button
          className="btn-primary btn-circle btn"
          onClick={handleIncreaseQuantity}
        >
          <Plus />
        </button>
        <span className="text-lg font-bold">{cartItem.quantity}</span>
        <button
          className="btn-primary btn-circle btn"
          onClick={handleDecreaseQuantity}
        >
          <Minus />
        </button>
      </div>
    </section>
  );
};

export default CartItem;
