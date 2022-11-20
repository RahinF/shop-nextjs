import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Extra from "./ManageProduct/Extra";

interface IExtra {
  text: string;
  price: number;
}

interface ICreatePostForm {
  title: string;
  description: string;
  file: FileList;
}

const ManageProduct = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostForm>({ mode: "all" });

  const [extras, setExtras] = useState<IExtra[] | []>([]);
  const [sizes, setSizes] = useState<IExtra[] | []>([]);

  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const createFilePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const file = files[0];

    if (!file) return setFilePreview(undefined);

    const fileURL = URL.createObjectURL(file);
    setFilePreview(fileURL);
  };

  const onSubmit = async (data: ICreatePostForm) => {
    console.log(data);
  };

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="title" className="label font-medium capitalize">
          title
        </label>
        <input
          id="title"
          type="text"
          className="input w-full"
          {...register("title", {
            required: "Title is required.",
          })}
        />
        {errors.title && (
          <p className="mt-2 text-error">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="label font-medium capitalize">
          description
        </label>
        <textarea
          id="description"
          className="textarea w-full"
          {...register("description", {
            required: "Description is required.",
          })}
        />
         {errors.description && (
          <p className="mt-2 text-error">{errors.description.message}</p>
        )}
      </div>

      <label htmlFor="image">
        <input
          id="image"
          type="file"
          className="file-input w-full"
          onChange={createFilePreview}
        />

        {filePreview && (
          <Image
            src={filePreview}
            alt="image preview"
            width={600}
            height={400}
          />
        )}
      </label>

      <Extra extras={sizes} setExtras={setSizes} />
      <Extra extras={extras} setExtras={setExtras} />

      <button className="btn-primary btn">create</button>
    </form>
  );
};

export default ManageProduct;
