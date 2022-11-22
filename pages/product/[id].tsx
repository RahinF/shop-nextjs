import { dehydrate, QueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProduct from "../../hooks/useProduct";
import { fetchProduct } from "../../services/product";
import useCart from "../../store/useCart";
import toPrice from "../../utils/toPrice";

interface IExtra {
  text: string;
  price: number;
}

interface IBase {
  text: string;
  price: number;
}

interface ISelected {
  base: IBase | {};
  extras: IExtra[] | [];
}

const Product = () => {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<ISelected>({ base: {}, extras: [] });
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();
  const { id } = router.query;

  const { product } = useProduct(id as string);

  const handleBaseOnClick = (base: IBase) => {
    setSelected((prev) => ({ ...prev, base }));
  };

  const handleExtrasOnChange = (extra: IExtra, isChecked: boolean) => {
    setSelected((prev) => {
      if (isChecked) {
        return { ...prev, extras: [...prev.extras, extra] };
      } else {
        return {
          ...prev,
          extras: prev.extras.filter((current) => current !== extra),
        };
      }
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    const base = (selected.base as IBase).text;
    const extras = selected.extras.map((extra) => extra.text);

    addToCart({ id: product._id, base, extras });
    toast.success(`${product.title} added to cart.`);
  };

  // set base on render
  useEffect(() => {
    if (!product) return;
    setSelected({ base: product.bases[0], extras: [] });
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const basePrice = product.price;
    const selectedBase = (selected.base as IBase).price;

    const extras = selected.extras
      .map((extra) => extra.price)
      .reduce((prev, current) => prev + current, 0);

    const total = basePrice + selectedBase + extras;
    setTotalPrice(total);
  }, [product, selected]);

  if (!product) return <p>loading...</p>;

  return (
    <article className="flex flex-col lg:flex-row lg:justify-evenly lg:gap-10">
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={`${product.title} product page`} />
      </Head>
      <div>
        <Image
          src={product.image}
          alt={product.title}
          height={500}
          width={500}
          priority
        />
      </div>

      <div className="flex max-w-xl flex-col gap-10">
        <header>
          <h1 className="text-3xl font-bold uppercase">{product.title}</h1>
          <span className="text-2xl font-bold uppercase text-primary">
            {toPrice(totalPrice)}
          </span>
          <p className="mt-2 max-w-prose">{product.description}</p>
        </header>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Select a base</h2>
          <div className="flex flex-wrap gap-8">
            {product.bases.map((base) => (
              <button key={base.text} onClick={() => handleBaseOnClick(base)}>
                <div
                  className={clsx(
                    "flex h-40 w-40 flex-col justify-center rounded border",
                    {
                      "border-primary bg-primary text-white":
                        base.text === (selected.base as IBase).text,
                    }
                  )}
                >
                  <p>{base.text}</p>
                  <p className="font-bold">{toPrice(base.price)}+</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Select extras</h2>

          <div>
            {product.extras.map((extra) => (
              <div
                className="flex w-full max-w-xs items-center gap-2"
                key={extra.text}
              >
                <input
                  type="checkbox"
                  id={extra.text}
                  className="checkbox-primary checkbox"
                  onChange={(event) =>
                    handleExtrasOnChange(extra, event.target.checked)
                  }
                />
                <label
                  htmlFor={extra.text}
                  className="label w-full justify-between capitalize"
                >
                  <span>{extra.text}</span>
                  <span>{toPrice(extra.price)}</span>
                </label>
              </div>
            ))}
          </div>
        </section>
        <button className="btn-primary btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </article>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const { params } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product"], () => fetchProduct(params.id));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Product;
