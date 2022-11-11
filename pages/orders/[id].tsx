import clsx from "clsx";
import Image from "next/image";
import { CheckCircle } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";

type TStatusText = "Payment" | "Preparing" | "On the way" | "Delivered";

interface IStatus {
  text: TStatusText;
  src: string;
  alt: string;
}

const Order = () => {
  const currentStatus: TStatusText = "On the way";
  const [completedStatus, setCompletedStatus] = useState<number>(0);

  const statuses: IStatus[] = useMemo(
    () => [
      { text: "Payment", src: "/images/paid.png", alt: "order paid" },
      { text: "Preparing", src: "/images/bake.png", alt: "order preparing" },
      { text: "On the way", src: "/images/paid.png", alt: "order on the way" },
      {
        text: "Delivered",
        src: "/images/delivered.png",
        alt: "order delivered",
      },
    ],
    []
  );

  useEffect(() => {
    const completedStatus = statuses.findIndex(
      (status) => status.text === currentStatus
    );

    setCompletedStatus(completedStatus);
  }, [statuses]);

  return (
    <div className="flex flex-col justify-evenly gap-10 lg:flex-row">
      <div>
        <h1 className="text-3xl font-bold uppercase">order summary</h1>

        <table className="table w-full">
          <tbody>
            <tr>
              <td>Order ID</td>
              <td>Customer</td>
              <td>Address</td>
            </tr>
            <tr>
              <td>129837819237</td>
              <td>John Doe</td>
              <td>Elton st. 212-33 LA</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10 flex max-w-md justify-evenly gap-2">
          {statuses.map((status, index) => {
            const isCompleted = completedStatus >= index;

            return (
              <div className="flex flex-col items-center" key={status.text}>
                <Image
                  src={status.src}
                  width={32}
                  height={32}
                  alt={status.alt}
                  className={clsx({ "opacity-50": !isCompleted })}
                />
                <span className={clsx({ "text-zinc-400": !isCompleted })}>
                  {status.text}
                </span>
                {isCompleted && (
                  <CheckCircle
                    size={24}
                    weight="fill"
                    className="text-green-400"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <aside className="sticky top-28 flex h-min w-full max-w-xs flex-col items-stretch self-center bg-neutral p-4 text-white lg:self-start">
        <h1 className="mb-10 text-center text-xl font-bold uppercase">
          cart total
        </h1>
        <div className="flex justify-between text-lg">
          <p>Items:</p>
          <p>10</p>
        </div>
        <div className="flex justify-between text-lg">
          <p>Total Price:</p>
          <p>$200</p>
        </div>
        <button className="btn-primary btn mt-10 w-full max-w-sm">paid</button>
      </aside>
    </div>
  );
};

export default Order;
