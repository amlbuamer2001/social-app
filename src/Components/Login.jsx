import { useForm } from "react-hook-form";
import Register from "./Register";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [apiError, setApiError] = useState("");
  const [loading, setloading] = useState(false);
  let navigate = useNavigate();

  let schema = z.object({
    email: z.string().email("invalid email"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must contain uppercase, lowercase, number, symbol, and be 8+ characters"
      ),
  });

  let form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(data) {
    setloading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signin`, data)
      .then((res) => {
        setloading(false);
        if (res.data.message === "success") {
          //go login
          navigate("/home");
        }
      })
      .catch((error) => {
        setloading(false);

        setApiError(error.response.data.error);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-md my-20 mx-auto"
    >
      {apiError && <h1 className="bg-danger text-white">{apiError}</h1>}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          {...register("email")}
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          email
        </label>
        {formState.errors.email && formState.touchedFields.email ? (
          <p className="text-danger mt-3">{formState.errors.email.message}</p>
        ) : (
          ""
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          {...register("password")}
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          password
        </label>
        {formState.errors.password && formState.touchedFields.password ? (
          <p className="text-danger mt-3">
            {formState.errors.password.message}
          </p>
        ) : (
          ""
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        {loading ? 'loading' : 'Submit'}
      </button>
    </form>
  );
}
