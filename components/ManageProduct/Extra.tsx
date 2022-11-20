import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import toPrice from "../../utils/toPrice";

interface IExtra {
  text: string;
  price: number;
}

interface Props {
  extras: IExtra[];
  setExtras: React.Dispatch<React.SetStateAction<[] | IExtra[]>>;
}

const Extra = ({ extras, setExtras }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IExtra>({ mode: "onSubmit" });

  const addExtra = (extra: IExtra) => {
    if (extras.find((e) => e.text === extra.text)) {
      toast.error("Extra already exists.");
    } else {
      extra.price = extra.price * 100;
      setExtras((prev) => [...prev, extra]);
      toast.success(`Extra '${extra.text}' added.`);
    }
  };

  const deleteExtra = (extra: IExtra) => {
    setExtras((prev) => prev.filter((prev) => prev.text !== extra.text));
    toast.success(`Extra '${extra.text}' deleted.`);
  };

  return (
    <section className="w-full">
      <h2>extras</h2>

      <div className="flex items-end gap-2">
        <div className="basis-full">
          <label htmlFor="extra-text" className="label">
            text
          </label>
          <input
            id="extra-text"
            type="text"
            className="input-bordered input w-full"
            {...register("text", { required: "Text is required." })}
          />
          {errors.text && <p>{errors.text.message}</p>}
        </div>
        <div>
          <label htmlFor="extra-price" className="label">
            price
          </label>
          <input
            id="extra-price"
            type="number"
            min={0}
            max={100}
            step={0.01}
            className="input-bordered input w-28"
            {...register("price", { required: "Price is required." })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <button className="btn" type="button" onClick={handleSubmit(addExtra)}>
          add
        </button>
      </div>

      <div>
        <table className="table w-full">
          <tbody>
            {extras.map((extra) => (
              <tr key={extra.text}>
                <td>{extra.text}</td>
                <td>{toPrice(extra.price)}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => deleteExtra(extra)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Extra;
