import { AxiosError } from "axios";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { Warning } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import ILoginForm from "../../types/ILoginForm";

const Login = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: "onBlur" });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loginMutation } = useAuth();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync(data);
      router.push("/admin");
    } catch (error) {
      const errors = error as AxiosError;
      const status = errors.response?.status;
      const message = errors.response?.data as string;

      if (status === 400 || status === 401) {
        setError(message);
      } else {
        setError("Something went wrong...");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <Head>
        <title>Admin Login</title>
        <meta
          name="description"
          content="login to access admin actions"
        />
      </Head>

      <div className="flex w-full max-w-md flex-col items-center border py-10 px-4">
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        {error && (
          <span className="text-error" role="alert">
            {error}
          </span>
        )}

        <form
          className="m-auto my-6 flex w-full max-w-sm flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="label">
              <span>
                Username{" "}
                <span aria-hidden className="text-error">
                  *
                </span>
              </span>
            </label>
            <input
              id="username"
              type="text"
              className={clsx("input-bordered input", {
                "border-error focus:border-error focus:ring-error":
                  errors.username,
              })}
              aria-required
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", { required: "Username is required." })}
            />

            {errors.username && (
              <span
                role="alert"
                className="mt-2 flex items-center gap-2 text-sm text-error"
              >
                <Warning size={16} weight="fill" /> {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="label flex justify-between">
              <span>
                Password{" "}
                <span aria-hidden className="text-error">
                  *
                </span>
              </span>

              <button
                type="button"
                className="text-gray-600"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                aria-label={
                  isPasswordVisible
                    ? "Hide password."
                    : "Show password as plain text. Warning: this will display your password on the screen."
                }
              >
                {isPasswordVisible ? "Hide password" : " Show password"}
              </button>
            </label>

            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              className={clsx("input-bordered input", {
                "border-error focus:border-error focus:ring-error":
                  errors.password,
              })}
              aria-required
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required.",
              })}
            />

            {errors.password && (
              <span
                role="alert"
                className="mt-2 flex items-center gap-2 text-sm text-error"
              >
                <Warning size={16} weight="fill" /> {errors.password.message}
              </span>
            )}
          </div>

          <div aria-hidden>
            Fields marked with <span className="text-error">*</span> are
            required.
          </div>

          <button className="btn mt-8" disabled={isLoading}>
            {isLoading ? "logging in..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
