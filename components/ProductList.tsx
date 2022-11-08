import Card from "./Card";

const ProductList = () => {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-3xl font-bold uppercase">the best pizza in town</h1>
        <p className="max-w-prose text-xl mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
          arcu in pretium molestie. Interdum et malesuada fames acme. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start justify-items-center gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(12)].map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
