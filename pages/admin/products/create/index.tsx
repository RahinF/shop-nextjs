import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Warning } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CreateProductItem from "../../../../components/CreateProductItem";
import useFileUpload from "../../../../hooks/useFileUpload";
import useProduct from "../../../../hooks/useProduct";

interface IExtra {
  text: string;
  price: number;
}

interface ICreatePostForm {
  title: string;
  description: string;
  file: FileList;
  price: number;
}

const CreateProduct = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostForm>();

  const [extras, setExtras] = useState<IExtra[] | []>([
    {
      text: "Peri-peri Sauce Swirl",
      price: 100,
    },
  ]);
  const [bases, setBases] = useState<IExtra[] | []>([
    { text: "Classic Crust", price: 0 },
    { text: "Deep Pan", price: 0 },
    { text: "Thin 'n' Crispy", price: 0 },
    { text: "Gluten Free Sourdough Base", price: 299 },
    { text: "Cheesy Crust", price: 349 },
  ]);

  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const createFilePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const file = files[0];

    if (!file) return setFilePreview(undefined);

    const fileURL = URL.createObjectURL(file);
    setFilePreview(fileURL);
  };

  const { createProductMutation } = useProduct();
  const { uploadFileMutation } = useFileUpload();

  const onSubmit = async (data: ICreatePostForm) => {
    if (!bases.length) return;

    const { title, description, file, price } = data;

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET as string
    );

    try {
      const { secure_url } = await uploadFileMutation.mutateAsync(formData);

      const product = {
        title,
        description,
        price: Math.round(Number(price) * 100),
        bases,
        extras,
        image: secure_url,
      };

      await createProductMutation.mutateAsync(product);

      router.push("/admin/products");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>Admin - Create Product</title>
        <meta name="description" content="create new product form" />
      </Head>

      <header className="flex justify-between">
        <h1 className="text-3xl font-bold uppercase">add a new product</h1>
        <button className="btn-primary btn">create</button>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex basis-1/2 flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="label font-medium capitalize">
              title
            </label>
            <input
              id="title"
              type="text"
              className="input-bordered input w-full"
              {...register("title", {
                required: "Title is required.",
              })}
            />
            {errors.title && (
              <span className="mt-2 flex items-center gap-2 text-sm text-error">
                <Warning size={16} weight="fill" />
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="label font-medium capitalize"
            >
              description
            </label>
            <textarea
              id="description"
              rows={4}
              className="textarea-bordered textarea w-full"
              {...register("description", {
                required: "Description is required.",
              })}
            />
            {errors.description && (
              <span className="mt-2 flex items-center gap-2 text-sm text-error">
                <Warning size={16} weight="fill" />
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="starting-base-price"
              className="label font-medium capitalize"
            >
              base price
            </label>
            <div className="input-bordered input flex items-center">
              <span className="px-2">$</span>
              <input
                id="starting-base-price"
                className="h-full w-full"
                type="number"
                step="0.01"
                min={0}
                {...register("price", {
                  required: "Base price is required.",
                })}
              />
            </div>
            {errors.price && (
              <span className="mt-2 flex items-center gap-2 text-sm text-error">
                <Warning size={16} weight="fill" />
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="label font-medium capitalize">
              image
            </label>
            <input
              id="image"
              type="file"
              className="file-input input-bordered w-full"
              {...register("file", {
                required: "Image is required.",
                onChange: (event) => createFilePreview(event),
              })}
            />

            {filePreview && (
              <div className="mx-auto mt-4">
                <Image
                  src={filePreview}
                  alt="image preview"
                  width={600}
                  height={400}
                />
              </div>
            )}

            {errors.file && (
              <span className="mt-2 flex items-center gap-2 text-sm text-error">
                <Warning size={16} weight="fill" /> {errors.file.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <CreateProductItem items={bases} setItems={setBases} type="base" />
          <CreateProductItem items={extras} setItems={setExtras} type="extra" />
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
