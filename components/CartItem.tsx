import Image from "next/image";
import { Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import useCart from "../store/useCart";
import ICartProduct from "../types/ICartProduct";
import toPrice from "../utils/toPrice";

interface ICartItem {
  cartItem: ICartProduct;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const CartItem = ({ cartItem, setTotal }: ICartItem) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [unitPrice, setUnitPrice] = useState<number>(0);

  const { product } = useProduct(cartItem.id);

  const quantity = cartItem.quantity || 1;

  const handleIncreaseQuantity = () => {
    if (!cartItem.uuid) return;
    increaseQuantity(cartItem.uuid);
    setTotal((prev) => prev + unitPrice);
  };

  const handleDecreaseQuantity = () => {
    if (!cartItem.uuid) return;
    if (quantity > 1) {
      decreaseQuantity(cartItem.uuid);
      setTotal((prev) => prev - unitPrice);
    } else {
      removeFromCart(cartItem.uuid);
    }
  };

  useEffect(() => {
    if (!product) return;

    const basePrice = product.price;
    const selectedBase = product.bases.find(
      (base) => base.text === cartItem.base
    )?.price!;

    const extras: number = cartItem.extras
      .map((extra) => {
        const item = product.extras.find((e) => e.text === extra);
        return item ? item.price : 0;
      })
      .reduce((prev, current) => prev + current, 0);

    const unitPrice = basePrice + selectedBase + extras;
    const totalPrice = unitPrice * quantity;

    setUnitPrice(unitPrice);

    setTotal((prev) => prev + totalPrice);

    return () => setTotal((prev) => prev - totalPrice);
  }, [setTotal, cartItem, product]);

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
          {cartItem.base} {product.title}
        </h2>
        <h3 className="font-bold">Extras</h3>
        <p>{cartItem.extras.join(", ") || "none"}</p>
        <p className="mt-2 text-lg font-bold">
          {toPrice(unitPrice * quantity)}
        </p>
      </header>

      <div className="flex items-center gap-4">
        <button
          className="btn-primary btn-circle btn"
          onClick={handleIncreaseQuantity}
        >
          <Plus />
        </button>
        <span className="text-lg font-bold">{quantity}</span>
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
