import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IProduct from "../../types/IProduct";

async function fetchProduct(id: string): Promise<IProduct> {
  return axios
    .get(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.data);
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const { params } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product"], () => fetchProduct(params.id));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

interface IExtra {
  text: string;
  price: number;
}

interface ISize {
  text: string;
  price: number;
}

interface ISelected {
  size: ISize | {};
  extras: IExtra[] | [];
}

const Product = () => {
  const [selected, setSelected] = useState<ISelected>({ size: {}, extras: [] });
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();
  const { id } = router.query;

  const { data: product, isSuccess } = useQuery(
    ["product"],
    () => fetchProduct(id as string),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const handleSizeOnClick = (size: ISize) => {
    setSelected((prev) => ({ ...prev, size }));
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

  useEffect(() => {
    if (!isSuccess) return;
    setTotalPrice(product.sizes[0].price);
  }, [product, isSuccess]);

  useEffect(() => {
    if (!isSuccess) return;
    setSelected({ size: product.sizes[0], extras: [] });
  }, [product, isSuccess]);

  if (!isSuccess) return <p>loading...</p>;

  return (
    <article className="flex flex-col items-center lg:flex-row lg:justify-evenly lg:gap-10">
      <Head>
        <title>{product.title}</title>
        {/* add meta tag */}
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

      <div className="flex flex-col gap-10">
        <header>
          <h1 className="text-3xl font-bold uppercase">{product.title}</h1>
          <span className="text-2xl font-bold uppercase text-orange-400">
            ${totalPrice}
          </span>
          <p className="mt-2 max-w-prose">{product.description}</p>
        </header>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Select a size</h2>
          <div className="flex items-baseline gap-8">
            {product.sizes.map(({ price, text }, index) => (
              <button
                key={text}
                onClick={() => handleSizeOnClick({ text, price })}
                className="flex flex-col items-center gap-2"
              >
                <Image
                  src="/images/size.png"
                  alt={`size ${text}`}
                  height={50 + index * 25}
                  width={50 + index * 25}
                />
                <span className="badge">{text}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Select additional ingredients</h2>

          <div className="flex gap-4">
            {product.extras.map((extra) => (
              <div className="flex items-center gap-2" key={extra.text}>
                <input
                  type="checkbox"
                  id={extra.text}
                  className="checkbox-primary checkbox"
                  onChange={(event) =>
                    handleExtrasOnChange(extra, event.target.checked)
                  }
                />
                <label htmlFor={extra.text} className="label capitalize">
                  {extra.text}
                </label>
              </div>
            ))}
          </div>
        </section>
        <button className="btn-primary btn">Add to cart</button>
      </div>
    </article>
  );
};

export default Product;
