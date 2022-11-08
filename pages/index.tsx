import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";

const index = () => {
  return (
    <>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList />
    </>
  );
};

export default index;
