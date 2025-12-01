import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card ml-12 mt-10">
      <h3 className="text-3xl text-center">Welcome Back</h3>
      <h2 className="text-center">Please Login Here</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* email start*/}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* email end*/}

          {/* password start */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "password" && (
            <p className="text-red-500">Password Reguired</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password at least 6 character</p>
          )}
          {/* password end */}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 ">Login</button>
        </fieldset>
        <p>
          New to Zap Shift{" "}
          <Link state={location.state} to="/register" className="text-secondary font-bold">
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>

    </div>
  );
};

export default Login;
