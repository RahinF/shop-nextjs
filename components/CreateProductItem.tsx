import { Warning } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import toPrice from "../utils/toPrice";

interface IItem {
  text: string;
  price: number;
}

type TItemType = "base" | "extra";

interface Props {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<[] | IItem[]>>;
  type: TItemType;
}

const CreateProductItem = ({ items, setItems, type }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IItem>({ mode: "onSubmit" });

  const addItem = (item: IItem) => {
    if (items.find((e) => e.text === item.text)) {
      toast.error("Item already exists.");
    } else {
      item.price = item.price * 100;
      setItems((prev) => [...prev, item]);
      toast.success(`Item '${item.text}' added.`);
    }
  };

  const deleteItem = (item: IItem) => {
    setItems((prev) => prev.filter((prev) => prev.text !== item.text));
    toast.success(`Item '${item.text}' deleted.`);
  };

  return (
    <div className="w-full">
      <div className="flex items-end gap-2">
        <div className="basis-full">
          <label
            htmlFor={`${type}-text`}
            className="label font-medium capitalize"
          >
            {type}
          </label>
          <input
            id={`${type}-text`}
            type="text"
            className="input-bordered input w-full capitalize"
            {...register("text", {
              required: `${type[0].toUpperCase() + type.slice(1)} is required.`,
            })}
          />
        </div>
        <div>
          <label
            htmlFor={`${type}-price`}
            className="label font-medium capitalize"
          >
            price
          </label>
          <input
            id={`${type}-price`}
            type="number"
            min={0}
            max={100}
            step={0.01}
            className="input-bordered input w-28"
            {...register("price", { required: "Price is required." })}
          />
        </div>
        <button className="btn" type="button" onClick={handleSubmit(addItem)}>
          add
        </button>
      </div>

      {(errors.text || errors.price) && (
        <span className="mt-2 flex items-center gap-2 text-sm text-error">
          <Warning size={16} weight="fill" />
          {errors.text?.message || errors.price?.message}
        </span>
      )}

      <div>
        <table className="table w-full">
          <tbody>
            {items.map((item) => (
              <tr key={item.text}>
                <td>{item.text}</td>
                <td>{toPrice(item.price)}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => deleteItem(item)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateProductItem;
