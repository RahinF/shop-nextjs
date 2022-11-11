import Image from "next/image";
import { Minus, Plus } from "phosphor-react";

const CartItem = () => {
  return (
    <section className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="h-56 w-56">
        <Image
          src="/images/pizza.png"
          alt="pizza placeholder"
          height={400}
          width={400}
          priority
        />
      </div>
      <header>
        <h2 className="text-lg font-bold uppercase text-orange-400">
          Small Sushi Pizza
        </h2>
        <h3 className="font-bold">Extras</h3>
        <p>Extra cheese, chill flakes, garlic sauce</p>
        <p className="mt-2 text-lg font-bold">$39.80</p>
      </header>

      <div className="flex items-center gap-4">
        <button className="btn-primary btn-circle btn">
          <Plus />
        </button>
        <span className="text-lg font-bold">1</span>
        <button className="btn-primary btn-circle btn">
          <Minus />
        </button>
      </div>
    </section>
  );
};

export default CartItem;
