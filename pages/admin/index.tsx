import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Admin = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="admin panel containing restricted actions"/>
      </Head>

      <header className="mb-10 flex justify-between">
        <h1 className="text-3xl font-bold uppercase">Admin</h1>
      </header>

      <div className="flex justify-center gap-4">
        <Link href="/admin/products">
          <div className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded border shadow-md">
            <Image
              src="/images/pizza.svg"
              alt="pizza icon"
              width={100}
              height={100}
            />
            <span className="text-lg font-bold uppercase">products</span>
          </div>
        </Link>
        <Link href="/admin/orders">
          <div className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded border shadow-md">
            <Image
              src="/images/orders.svg"
              alt="pizza icon"
              width={100}
              height={100}
            />
            <span className="text-lg font-bold uppercase">orders</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Admin;
