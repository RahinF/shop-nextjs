import IProduct from "../types/IProduct";
import Card from "./Card";

interface IProductList {
  products: IProduct[] | undefined;
}

const ProductList = ({ products }: IProductList) => {
  return (
    <div className="flex flex-col items-center gap-10">
      <header className="my-10 text-center">
        <h1 className="text-3xl font-bold uppercase">the best pizza in town</h1>
        <p className="mt-2 max-w-prose text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
          arcu in pretium molestie. Interdum et malesuada fames acme. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start justify-items-center gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
