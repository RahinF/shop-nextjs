import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useProduct from "../../../hooks/useProduct";
import { fetchProducts } from "../../../services/product";
import toPrice from "../../../utils/toPrice";

const Products = () => {
  const { products, deleteProductMutation } = useProduct();

  const handleDeleteProduct = async (id: string) => {
    try {
      const product = await deleteProductMutation.mutateAsync(id);
      toast.success(`${product} deleted.`);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <Head>
        <title>Admin - Products</title>
        <meta name="description" content="shows products and actions to create and modify them" />
      </Head>

      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase">products</h1>
        <Link href="/admin/products/create" className="btn my-2">
          add product
        </Link>
      </header>

      <table className="table w-full">
        <thead>
          <tr>
            <td>Image</td>
            <td>id</td>
            <td>title</td>
            <td>base price</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>
                <Image
                  src={product.image}
                  alt={`top view of ${product.title} pizza`}
                  height={100}
                  width={100}
                />
              </td>
              <td>{product._id}</td>
              <td>{product.title}</td>
              <td>{toPrice(product.price)}</td>
              <td className="space-x-2">
                <button
                  className="btn-error btn"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products"], fetchProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Products;
