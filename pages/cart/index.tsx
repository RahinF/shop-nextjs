import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import CartItem from "../../components/CartItem";
import PayPalButtonWrapper from "../../components/PayPalButtonWrapper";
import useOrder from "../../hooks/useOrder";
import useCart from "../../store/useCart";
import { IOrderRequest } from "../../types/IOrder";
import toPrice from "../../utils/toPrice";

const Cart = () => {
  const router = useRouter();
  const { products, quantity, clearCart } = useCart();
  const { createOrderMutation } = useOrder();

  const [total, setTotal] = useState<number>(0);

  const handleCreateOrder = async ({
    customer,
    address,
  }: {
    customer: string;
    address: string;
  }) => {
    const data: IOrderRequest = {
      customer,
      address,
      products,
      total: total,
      status: "Payment",
    };
    try {
      const response = await createOrderMutation.mutateAsync(data);
      clearCart();
      router.push(`http://localhost:3000/orders/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="flex flex-col justify-evenly gap-10 lg:flex-row">
      <article className="flex w-full max-w-screen-md flex-col gap-10">
        <h1 className="text-3xl font-bold uppercase">Shopping cart</h1>

        <div className="flex flex-col gap-20">
          {products.map((product, index) => (
            <CartItem key={index} cartItem={product} setTotal={setTotal} />
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

        <div className="mt-10 flex flex-col gap-2">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AXu_5azCk9u8kmBcpZYyDDJSr09CRq9KVS_NtyLsBQm2UyywaKUU7UmAxQAdTCnorX2EUXpPSqFJqFrS",
              components: "buttons",
              currency: "AUD",
              "disable-funding": "credit,card,p24",
            }}
          >
            <PayPalButtonWrapper
              amount={(total / 100).toString()}
              showSpinner={false}
              createOrder={handleCreateOrder}
              disabled={!!!products.length}
            />
          </PayPalScriptProvider>
        </div>
      </aside>
    </div>
  );
};

export default Cart;
