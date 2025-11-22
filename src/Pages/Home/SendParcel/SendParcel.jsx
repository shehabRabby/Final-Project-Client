import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("total Cost :", cost);
    data.cost = cost;
    // sweet alert
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} BDT`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        //seave parcel info to database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("After saving data", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Parcel has created. Please pay",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  return (
    <div className="px-4 md:px-12 py-10 bg-black min-h-screen">
  {/* TITLE */}
  <h2
    className="text-center text-5xl font-extrabold tracking-wide 
               bg-gradient-to-r from-lime-400 via-green-500 to-lime-300 
               bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(132,255,132,0.8)]"
  >
    Send A Parcel
  </h2>

  <div className="text-center text-gray-500 mt-1 mb-10">
    ---------------------------------------------------------------
  </div>

  {/* FORM CARD */}
  <form
    onSubmit={handleSubmit(handleSendParcel)}
    className="mx-auto max-w-6xl backdrop-blur-2xl bg-black/40
               border border-lime-400/40
               shadow-[0_0_50px_rgba(0,255,60,0.5)]
               rounded-3xl p-8 md:p-12
               grid gap-10"
  >
    {/* SUBHEADER */}
    <h3
      className="text-2xl md:text-3xl font-semibold mb-8 
                 bg-gradient-to-r from-green-400 to-lime-400 
                 bg-clip-text text-transparent drop-shadow-md text-center"
    >
      Enter Your Parcel Details
    </h3>

    {/* DOCUMENT TYPE */}
    <div className="flex gap-8 justify-center mb-10">
      {["document", "non-document"].map((type) => (
        <label key={type} className="flex items-center gap-2 text-lime-400 font-semibold">
          <input
            type="radio"
            {...register("parcelType")}
            value={type}
            defaultChecked={type === "document"}
            className="radio radio-success"
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </div>

    {/* PARCEL INFO */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="text-lg font-semibold text-lime-300">Parcel Name</label>
        <input
          {...register("parcelName")}
          className="input w-full bg-black/70 text-white border border-lime-400/50 rounded-xl
                 shadow-sm focus:shadow-[0_0_12px_rgba(0,255,60,0.6)]
                 focus:border-lime-500 transition-all"
          placeholder="Parcel name"
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-lime-300">Parcel Weight (kg)</label>
        <input
          {...register("parcelWeight")}
          type="number"
          className="input w-full bg-black/70 text-white border border-lime-400/50 rounded-xl
                 shadow-sm focus:shadow-[0_0_12px_rgba(0,255,60,0.6)]
                 focus:border-lime-500 transition-all"
          placeholder="Parcel weight"
        />
      </div>
    </div>

    {/* SENDER + RECEIVER */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* SENDER CARD */}
      <fieldset className="p-6 rounded-2xl border border-lime-400/40 bg-black/50 backdrop-blur-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent">
          Sender Details
        </h3>
        {/* Sender Inputs */}
        {["Name", "Email", "Address", "Phone"].map((field) => (
          <div key={field} className="mb-3">
            <label className="text-lime-300 font-semibold">{`Sender ${field}`}</label>
            <input
              {...register(`sender${field}`)}
              defaultValue={field === "Name" ? user?.displayName : field === "Email" ? user?.email : ""}
              className="input w-full bg-black/70 text-white border border-lime-400/50 rounded-xl"
            />
          </div>
        ))}

        {/* Region & District */}
        <label className="text-lime-300 font-semibold">Sender Region</label>
        <select {...register("senderRegion")} className="select w-full mb-3 bg-black/70 text-white border border-lime-400/50 rounded-xl">
          <option disabled>Pick a region</option>
          {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
        </select>

        <label className="text-lime-300 font-semibold">Sender District</label>
        <select {...register("senderDistrict")} className="select w-full mb-3 bg-black/70 text-white border border-lime-400/50 rounded-xl">
          <option disabled>Pick a district</option>
          {districtByRegions(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
        </select>

        <label className="text-lime-300 font-semibold">Pickup Instruction</label>
        <textarea
          {...register("instructionSender")}
          rows="4"
          className="textarea w-full bg-black/70 text-white border border-lime-400/50 rounded-xl"
        />
      </fieldset>

      {/* RECEIVER CARD */}
      <fieldset className="p-6 rounded-2xl border border-lime-400/40 bg-black/50 backdrop-blur-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent">
          Receiver Details
        </h3>
        {/* Receiver Inputs */}
        {["Name", "Email", "Address", "Phone"].map((field) => (
          <div key={field} className="mb-3">
            <label className="text-lime-300 font-semibold">{`Receiver ${field}`}</label>
            <input
              {...register(`receiver${field}`)}
              className="input w-full bg-black/70 text-white border border-lime-400/50 rounded-xl"
            />
          </div>
        ))}

        <label className="text-lime-300 font-semibold">Receiver Region</label>
        <select {...register("receiverRegion")} className="select w-full mb-3 bg-black/70 text-white border border-lime-400/50 rounded-xl">
          <option disabled>Pick a region</option>
          {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
        </select>

        <label className="text-lime-300 font-semibold">Receiver District</label>
        <select {...register("receiverDistrict")} className="select w-full mb-3 bg-black/70 text-white border border-lime-400/50 rounded-xl">
          <option disabled>Pick a district</option>
          {districtByRegions(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
        </select>

        <label className="text-lime-300 font-semibold">Pickup Instruction</label>
        <textarea
          {...register("instructionReceiver")}
          rows="4"
          className="textarea w-full bg-black/70 text-white border border-lime-400/50 rounded-xl"
        />
      </fieldset>
    </div>

    {/* SUBMIT */}
    <button
      type="submit"
      className="mt-10 w-full md:w-auto px-10 py-3 rounded-xl 
                 font-bold text-black text-lg
                 bg-gradient-to-r from-green-500 to-lime-400
                 shadow-[0_0_25px_rgba(0,255,100,0.6)]
                 hover:shadow-[0_0_40px_rgba(0,255,100,0.9)]
                 transition-all duration-300 mx-auto block"
    >
      Send Parcel
    </button>
  </form>
</div>

  );
};

export default SendParcel;
