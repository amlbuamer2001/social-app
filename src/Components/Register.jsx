import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function Register() {
    
    const [apiError,setApiError] = useState('');
    const [loading, setloading] = useState(false)
    let navigate= useNavigate()

  let schema = z
    .object({
      name: z.string().min(3, "name must be at least 3 chars"),
      email: z.string().email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          "Password must contain uppercase, lowercase, number, symbol, and be 8+ characters"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
        .refine((date) => {
          const today = new Date();
          const userDate = new Date(date);
          return userDate <= today;
        }, "can't be future date"),
      gender: z.enum(["male", "female"], {
        message: "gender must be male or female",
      }),
    })
    // 🔥 Password Match Validation
    .refine((object) => object.password === object.rePassword, {
      message: "password and rePassword not matched!",
      path: ["rePassword"], // يظهر تحت rePassword فقط
    });

  let form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver:zodResolver(schema)
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(data) {
    setloading(true)
    axios.post(`https://linked-posts.routemisr.com/users/signup`,data)
    .then((res)=>{
        setloading(false)
        if(res.data.message==='success'){
//go login
navigate('/login')
        }
    })
    .catch((error)=>{
        setloading(false)
        setApiError(error.response.data.error);
        
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-md my-20 mx-auto"
    >
        <h1 className="bg-danger text-white">{apiError}</h1>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("name")}
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
        />
        <label
          htmlFor="name"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          name
        </label>
        {formState.errors.name && formState.touchedFields.name?<p className="text-danger mt-3">{formState.errors.name.message}</p>:''}
      </div>

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
        {formState.errors.email && formState.touchedFields.email?<p className="text-danger mt-3">{formState.errors.email.message}</p>:''}

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
                {formState.errors.password && formState.touchedFields.password?<p className="text-danger mt-3">{formState.errors.password.message}</p>:''}

      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          {...register("rePassword")}
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
        />
        <label
          htmlFor="rePassword"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          rePassword
        </label>
                {formState.errors.rePassword && formState.touchedFields.rePassword ?<p className="text-danger mt-3">{formState.errors.rePassword.message}</p>:''}

      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          {...register("dateOfBirth")}
          id="dateOfBirth"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
        />
        <label
          htmlFor="dateOfBirth"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Date Of Birth
        </label>
                {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth?<p className="text-danger mt-3">{formState.errors.dateOfBirth.message}</p>:''}

      </div>

      <div className="flex items-center mb-4">
        <input
          id="male"
          type="radio"
          value="male"
          {...register("gender")}
          className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
        />
        <label
          htmlFor="male"
          className="select-none ms-2 text-sm font-medium text-heading"
        >
          male
        </label>
                {formState.errors.gender && formState.touchedFields.gender ?<p className="text-danger mt-3">{formState.errors.gender.message}</p>:''}

      </div>

      <div className="flex items-center mb-4">
        <input
          id="female"
          type="radio"
          value="female"
          {...register("gender")}
          className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
        />
        <label
          htmlFor="female"
          className="select-none ms-2 text-sm font-medium text-heading"
        >
          female
        </label>
                {formState.errors.gender && formState.touchedFields.gender ?<p className="text-danger mt-3">{formState.errors.gender.message}</p>:''}

      </div>

      <button
        type="submit"
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        {loading?'loading':'Submit'}
      </button>
    </form>
  );
}
