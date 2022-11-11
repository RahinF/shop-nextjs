import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import IProduct from "../types/IProduct";

async function fetchProducts(): Promise<IProduct[]> {
  return axios
    .get("http://localhost:3000/api/products")
    .then((response) => response.data);
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products"], fetchProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

const Home = () => {
  const { data: products } = useQuery(["products"], fetchProducts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList products={products} />
    </>
  );
};

export default Home;
