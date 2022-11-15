import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../services/product";

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

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products"], fetchProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Home;
