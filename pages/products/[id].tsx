import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProduct {
  _id: string;
  name: string;
}
interface IInputs {
  name: string;
}

async function fetchProduct(id: string): Promise<IProduct> {
  return axios
    .get(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.data);
}

async function updateProduct({ id, data }: { id: string; data: IInputs }) {
  return axios.put(`http://localhost:3000/api/products/${id}`, {
    data: data,
  });
}

const UpdateProduct = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IInputs>();

  const { data: product, isSuccess } = useQuery(
    ["product"],
    () => fetchProduct(productId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      reset({ name: product.name });
    }
  }, [product, isSuccess, reset]);

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    if (!isSuccess) return;
    updateProductMutation.mutate({ id: product._id, data });
  };

  return (
    <>
      <Link href="/products">products</Link>
      <form
        className="flex max-w-sm flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span>{product?._id}</span>
        <label htmlFor="add product">update product</label>
        <input
          id="add product"
          type="text"
          className="border"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <button className="border" disabled={updateProductMutation.isLoading}>
          {updateProductMutation.isLoading ? "updating..." : "update"}
        </button>
      </form>
    </>
  );
};

export async function getServerSideProps(context: { params: { id: string } }) {
  const { params } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product"], () => fetchProduct(params.id));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default UpdateProduct;
