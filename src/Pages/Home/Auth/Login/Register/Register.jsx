import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../Hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInUser } = useAuth();

  const handleRegisteration = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
      <h2 className="text-center">Register Here</h2>
      <form onSubmit={handleSubmit(handleRegisteration)} className="card-body">
        <fieldset className="fieldset">
          {/* email  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password  */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "password" && (
            <p className="text-red-500">Password Reguired</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password at least 6 character</p>
          )}

          {/* forget password  */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an accout?{" "}
          <Link to="/login" className="text-secondary font-bold">
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
