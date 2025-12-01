import React from "react";
import useAuth from "../../../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        // console.log(result.user);

        //create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURl: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("User data has benn store", res.data);
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center py-4">
  <p className="mb-4 text-gray-500 font-medium">Or</p>

  {/* Google Login Button */}
  <button
    onClick={handleGoogleSignIn}
    className="flex items-center justify-center w-full border border-gray-300 rounded-lg bg-white py-2.5 px-4 text-black font-medium hover:shadow-md transition"
  >
    {/* Google Icon */}
    <svg
      className="w-5 h-5 mr-3"
      aria-label="Google logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path fill="#4285F4" d="M113 255.2c0-17.7 2.7-34.6 7.8-50.8H113v-51h-.1c0 0-0.1 0 0 0H113v101z" />
      <path fill="#34A853" d="M256 113c34.4 0 64.9 12.2 88.9 32.2l66.7-66.7C368.2 40.1 314 16 256 16 157.3 16 69.5 84.2 35.5 169.3l77.6 60.2C131.4 165.2 189.1 113 256 113z" />
      <path fill="#FBBC05" d="M91 285.4l-77.6 60.2C69.5 427.8 157.3 496 256 496c61.6 0 118.2-22.3 161-58.9l-78.1-63.2C320.3 397.1 288 409 256 409c-67.1 0-124.7-52.2-142.9-123.6z" />
      <path fill="#EA4335" d="M256 496c70.1 0 129.1-23 171-62.2l-78.1-63.2c-23.3 15.5-53.8 25.4-92.9 25.4-68.1 0-126.1-50.2-142.9-118.8l-77.6 60.2C69.5 427.8 157.3 496 256 496z" />
    </svg>

    <span>Continue with Google</span>
  </button>
</div>

   
  );
};

export default SocialLogin;
