import Carousel from "./Carousel";

const Featured = () => {
  const slides = [
    {
      src: "/images/featured.jpg",
      alt: "featured 1",
      width: 1536,
      height: 416,
    },
    {
      src: "/images/featured.jpg",
      alt: "featured 1",
      width: 1536,
      height: 416,
    },
  ];
  return (
    <div>
      <Carousel showIndicators showButtons slides={slides}/>
    </div>
  );
};

export default Featured;
