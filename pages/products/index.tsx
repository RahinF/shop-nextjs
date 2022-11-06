import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProduct {
  _id: string;
  name: string;
}

interface IInputs {
  name: string;
}

async function fetchProducts(): Promise<IProduct[]> {
  return axios
    .get("http://localhost:3000/api/products")
    .then((response) => response.data);
}

async function createProduct(data: IInputs) {
  return axios.post("http://localhost:3000/api/products", { data });
}

async function removeProduct(productId: string) {
  return axios.delete("http://localhost:3000/api/products", {
    params: { id: productId },
  });
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products"], fetchProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default function Home() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInputs>();

  const { data: products } = useQuery(["products"], fetchProducts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      reset();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    createProductMutation.mutate(data);
  };

  return (
    <div className="m-auto grid h-screen w-full max-w-lg place-items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex gap-4">
        <form
          className="flex max-w-sm flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="add product">add product</label>
          <input
            id="add product"
            type="text"
            className="border"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <button className="border">add</button>
        </form>

        <div>
          <h1 className="font-bold">products</h1>
          <div className="grid gap-2">
            {products?.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between"
              >
                <span className="cursor-pointer">
                  <Link href="/products/[id]" as={`/products/${product._id}`}>
                    {product.name}
                  </Link>
                </span>
                <span
                  className="cursor-pointer border px-4 py-2 font-medium uppercase"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  delete
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
