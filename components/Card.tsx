import Image from "next/image";

const Card = () => {
  return (
    <section className="w-56">
      <div className="h-56">
        <Image
          src="/images/pizza.png"
          alt="pizza placeholder"
          height={400}
          width={400}
          priority
        />
      </div>
      <header className="text-center mt-4">
        <h1 className="uppercase font-bold text-lg text-orange-400">Sushi Pizza</h1>
        <span className="font-bold text-lg">$19.90</span>
        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </header>
    </section>
  );
};

export default Card;
