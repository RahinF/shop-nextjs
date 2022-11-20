import Image from "next/image";
import Link from "next/link";
import IProduct from "../types/IProduct";
import toPrice from "../utils/toPrice";

interface ICard {
  product: IProduct;
}

const Card = ({ product }: ICard) => {
  return (
    <Link href={`/product/${product._id}`}>
      <section className="w-56">
        <div className="h-56">
          <Image
            src={product.image}
            alt={`top view of ${product.title} pizza`}
            height={400}
            width={400}
            priority
          />
        </div>
        <header className="mt-4 text-center">
          <h1 className="text-lg font-bold uppercase text-primary">
            {product.title}
          </h1>
          <span className="text-lg font-bold">
            {toPrice(product.price)}
          </span>
          <p className="mt-2">{product.description}</p>
        </header>
      </section>
    </Link>
  );
};

export default Card;
