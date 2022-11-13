import { IStatus } from "../types/IOrder";

const orderStatus: IStatus[] = [
  {
    text: "Payment",
    src: "/images/paid.png",
    alt: "order paid",
  },
  {
    text: "Preparing",
    src: "/images/bake.png",
    alt: "order preparing",
  },
  {
    text: "On the way",
    src: "/images/paid.png",
    alt: "order on the way",
  },
  {
    text: "Delivered",
    src: "/images/delivered.png",
    alt: "order delivered",
  },
];

export default orderStatus;
