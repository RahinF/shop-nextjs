import Image from "next/image";
import { useState } from "react";

const pizza = {
  id: 1,
  img: "/img/pizza.png",
  name: "CAMPAGNOLA",
  price: [19.9, 23.95, 27.99],
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
};

const Product = () => {
  const [size, setSize] = useState(0);

  return (
    <article className="flex flex-col items-center lg:flex-row lg:justify-evenly lg:gap-10">
      <div>
        <Image
          src="/images/pizza.png"
          alt={pizza.name}
          height={500}
          width={500}
        />
      </div>

      <form className="flex flex-col gap-10">
        <header>
          <h1 className="text-3xl font-bold uppercase">{pizza.name}</h1>
          <span className="text-2xl font-bold uppercase text-orange-400">
            ${pizza.price[size].toFixed(2)}
          </span>
          <p className="mt-2 max-w-prose">{pizza.desc}</p>
        </header>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Select a size</h2>
          <div className="flex items-baseline gap-8">
            <button
              type="button"
              onClick={() => setSize(0)}
              className="flex flex-col gap-2"
            >
              <Image
                src="/images/size.png"
                alt="size small"
                height={50}
                width={50}
              />
              <span className="badge">Small</span>
            </button>
            <button
              type="button"
              onClick={() => setSize(1)}
              className="flex flex-col gap-2"
            >
              <Image
                src="/images/size.png"
                alt="size medium"
                height={75}
                width={75}
              />
              <span className="badge">Medium</span>
            </button>
            <button
              type="button"
              onClick={() => setSize(2)}
              className="flex flex-col items-center gap-2"
            >
              <Image
                src="/images/size.png"
                alt="size large"
                height={100}
                width={100}
              />
              <span className="badge">Large</span>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Select additional ingredients</h2>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="extra cheese"
                id="extra cheese"
                className="checkbox-primary checkbox"
              />
              <label htmlFor="extra cheese" className="label">
                Extra Cheese
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="garlic sauce"
                id="garlic sauce"
                className="checkbox-primary checkbox"
              />
              <label htmlFor="garlic sauce" className="label">
                Garlic Sauce
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="chilli flakes"
                id="chilli flakes"
                className="checkbox-primary checkbox"
              />
              <label htmlFor="chilli flakes" className="label">
                Chilli Flakes
              </label>
            </div>
          </div>
        </section>
        <button className="btn-primary btn" type="submit">
          Add to cart
        </button>
      </form>
    </article>
  );
};

export default Product;
