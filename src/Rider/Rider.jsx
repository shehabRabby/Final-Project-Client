import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const districtByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    // console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Your application has been submited. We will reach to you in 15 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="w-full px-4 md:px-10 py-10 bg-[#0c0c0c] min-h-screen">
      <h2
        className="text-4xl font-extrabold text-center mb-6 
    bg-gradient-to-r from-lime-300 via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,80,0.4)]"
      >
        Welcome to be a rider
      </h2>

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="my-8 p-8 rounded-3xl shadow-2xl border border-lime-400/40 
      backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-lime-200/10"
      >
        {/* Rider Receiver Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Rider info */}
          <fieldset
            className="fieldset mb-4 p-6 rounded-xl shadow-xl 
        bg-white/10 backdrop-blur-md border border-lime-300/30"
          >
            <h3 className="text-2xl font-bold mb-4 text-lime-300 drop-shadow-md">
              Rider Details
            </h3>

            {/* Rider name */}
            <label className="label text-lime-200 font-semibold text-lg">
              Rider Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="input w-full bg-white/80 text-black rounded-lg"
              defaultValue={user?.displayName}
              placeholder="Enter name"
            />

            {/* Rider Email */}
            <label className="label text-lime-200 font-semibold text-lg">
              Rider Email
            </label>
            <input
              type="text"
              {...register("email")}
              className="input w-full bg-white/80 text-black rounded-lg"
              defaultValue={user?.email}
              placeholder="Enter email"
            />

            {/* Address */}
            <label className="label text-lime-200 font-semibold text-lg">
              Your Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="input w-full bg-white/80 text-black rounded-lg"
              placeholder="Enter Address"
            />

            {/* Region */}
            <fieldset className="fieldset mt-4">
              <legend className="fieldset-legend text-lime-200 font-semibold text-lg">
                Regions
              </legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="select w-full bg-white/80 text-black rounded-lg"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* District */}
            <fieldset className="fieldset mt-4">
              <legend className="fieldset-legend text-lime-200 font-semibold text-lg">
                Districts
              </legend>
              <select
                {...register("district")}
                defaultValue="Pick a districts"
                className="select w-full bg-white/80 text-black rounded-lg"
              >
                <option disabled={true}>Pick a Districts</option>
                {districtByRegions(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Phone */}
            <label className="label text-lime-200 font-semibold text-lg mt-4">
              Your Phone No
            </label>
            <input
              type="text"
              {...register("phone")}
              className="input w-full bg-white/80 text-black rounded-lg"
              placeholder="Enter Phone"
            />
          </fieldset>

          {/* More Details */}
          <fieldset
            className="fieldset mb-4 p-6 rounded-xl shadow-xl 
        bg-white/10 backdrop-blur-md border border-lime-300/30"
          >
            <h3 className="text-2xl font-bold mb-4 text-lime-300 drop-shadow-md">
              More Details
            </h3>

            {/* Driving License */}
            <label className="label text-lime-200 font-semibold text-lg">
              Driving License
            </label>
            <input
              type="text"
              {...register("lisense")}
              className="input w-full bg-white/80 text-black rounded-lg"
              placeholder="Share license"
            />

            {/* NID */}
            <label className="label text-lime-200 font-semibold text-lg">
              NID
            </label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full bg-white/80 text-black rounded-lg"
              placeholder="Enter NID"
            />

            {/* Bike Info */}
            <label className="label text-lime-200 font-semibold text-lg">
              BIKE Info
            </label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full bg-white/80 text-black rounded-lg"
              placeholder="Enter Bike Info"
            />
          </fieldset>
        </div>

        <input
          type="submit"
          className="mt-8 btn w-full py-3 text-lg font-bold 
        bg-gradient-to-r from-lime-400 to-green-600 text-black 
        hover:shadow-[0_0_15px_rgba(0,255,120,0.6)] rounded-xl"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
