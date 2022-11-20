import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Featured = () => {
  const slides = [
    {
      src: "/images/featured.jpg",
      alt: "featured 1",
      width: 1536,
      height: 416,
    },
    {
      src: "/images/featured2.jpg",
      alt: "featured 2",
      width: 1536,
      height: 416,
    },
    {
      src: "/images/featured3.jpg",
      alt: "featured 2",
      width: 1536,
      height: 416,
    },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Featured;
