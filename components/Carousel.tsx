import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";

interface ISlide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ICarousel {
  autoplay?: number;
  showButtons?: boolean;
  showIndicators?: boolean;
  slides: ISlide[];
}

const Carousel = ({
  autoplay,
  showButtons,
  showIndicators,
  slides,
}: ICarousel) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState("right");

  const hasSlides = slides.length > 1;

  const nextSlide = useCallback(() => {
    setDirection("right");
    setActiveSlide((activeSlide + 1) % slides.length);
  }, [activeSlide, slides.length]);

  const previousSlide = useCallback(() => {
    setDirection("left");
    setActiveSlide(activeSlide <= 0 ? slides.length - 1 : activeSlide - 1);
  }, [activeSlide, slides.length]);

  useEffect(() => {
    if (autoplay && hasSlides) {
      const timer = setInterval(() => {
        nextSlide();
      }, autoplay * 1000);

      return () => clearInterval(timer);
    }
  }, [autoplay, slides.length, hasSlides, nextSlide]);

  const controls = (
    <div className="absolute top-1/2 mt-2 flex w-full -translate-y-1/2 justify-between gap-2 px-2 text-white">
      <button className="btn-ghost btn-circle btn">
        <CaretLeft size={24} onClick={previousSlide} />
      </button>
      <button className="btn-ghost btn-circle btn">
        <CaretRight size={24} onClick={nextSlide} />
      </button>
    </div>
  );

  const indicators = (
    <div className="my-2 flex justify-center gap-2">
      {slides.map((_, index) => (
        <span
          key={index}
          className={clsx({
            "h-2 w-2 cursor-pointer rounded-full transition": true,
            "bg-gray-200": !(activeSlide === index),
            "bg-black": activeSlide === index,
          })}
          onClick={() => setActiveSlide(index)}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div className="relative overflow-hidden">
        {slides.map((slide, index) => (
          <Transition
            key={index}
            show={activeSlide === index}
            enter="transform transition ease-in-out duration-500"
            enterFrom={clsx({
              "translate-x-full": direction === "right",
              "-translate-x-full": direction === "left",
            })}
            leave="transform transition ease-in-out duration-500"
            leaveTo={clsx({
              "-translate-x-full": direction === "right",
              "translate-x-full": direction === "left",
            })}
            // className="absolute"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={300}
            />
          </Transition>
        ))}

        {showButtons && hasSlides && controls}
      </div>

      {showIndicators && hasSlides && indicators}
    </div>
  );
};

export default Carousel;
