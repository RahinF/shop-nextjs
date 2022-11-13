import { useState } from "react";
import CartItem from "../../components/CartItem";
import useCart from "../../store/useCart";
import toPrice from "../../utils/toPrice";

const Cart = () => {
  const { products, quantity } = useCart();

  const [total, setTotal] = useState<number>(0);

  return (
    <div className="flex flex-col justify-evenly gap-10 lg:flex-row">
      <article className="flex w-full max-w-screen-md flex-col gap-10">
        <h1 className="text-3xl font-bold uppercase">Shopping cart</h1>

        <div className="flex flex-col gap-20">
          {products.map((product, index) => (
            <CartItem key={index} cartItem={product} setTotal={setTotal}/>
          ))}
        </div>
      </article>
      <aside className="sticky top-28 flex h-min w-full max-w-xs flex-col items-stretch self-center bg-neutral p-4 text-white lg:self-start">
        <h1 className="mb-10 text-center text-xl font-bold uppercase">
          Checkout
        </h1>
        <div className="flex justify-between text-lg">
          <p>Items:</p>
          <p>{quantity}</p>
        </div>
        <div className="flex justify-between text-lg">
          <p>Total Price:</p>
          <p>{toPrice(total)}</p>
        </div>

        <button className="btn-primary btn mt-10 w-full max-w-sm">pay</button>
      </aside>
    </div>
  );
};

export default Cart;
