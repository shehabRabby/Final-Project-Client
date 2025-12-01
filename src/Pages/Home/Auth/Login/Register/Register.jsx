import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleRegisteration = (data) => {
    // console.log("After register", data.photo[0]);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        //1.store the image and from data
        const formData = new FormData();
        formData.append("image", profileImage);
        // 2. send the photo to store and get url
        const imageAPI_Url = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host_Key
        }`;
        axios.post(imageAPI_Url, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURl: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User created in the database");
            }
          });
          // update user profile here
          const userProfile = {
            displayName: data.name,
            photoURl: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User profile update done");
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3 className="text-3xl text-center ml-5 mt-8">Welcome to Zap Shift</h3>
      <h2 className="text-center">Register Here</h2>
      <form onSubmit={handleSubmit(handleRegisteration)} className="card-body">
        <fieldset className="fieldset">
          {/* Name  */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Enter name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          {/* email */}
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

          {/* password  */}
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

          {/* forget password  */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an accout?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-secondary font-bold"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
