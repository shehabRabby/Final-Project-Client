import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
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

  const {user}= useAuth();
  const axiosSecure = useAxiosSecure();

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
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        //seave parcel info to database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("After saving data", res.data);
        });
        Swal.fire({
          title: "Added",
          text: "Your Parcel has been Recorded.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mt-10 text-center">Send A Parcel</h2>
      <div className="text-center">
        ---------------------------------------------------------------------
      </div>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="my-8 p-6 bg-lime-300 drop-shadow-xl"
      >
        <h3 className="text-2xl font-semibold mb-5">
          Enter your parcel details
        </h3>
        {/* document type */}
        <div>
          <label className="label mr-4 text-secondary">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>

          <label className="label text-secondary">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* parcelinfo  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 space-y-8">
          <fieldset className="fieldset">
            <label className="label text-secondary font-semibold text-lg">
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-secondary font-semibold text-lg">
              Parcel Weight (kg)
            </label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* Sender Receiver Details  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* sender info  */}

          <fieldset className="fieldset mb-2">
            <h3 className="text-2xl font-extrabold mb-4 text-secondary">
              Sender Details
            </h3>
            {/* sender name  */}
            <label className="label text-secondary font-semibold text-lg">
              Sender Name
            </label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              defaultValue={user?.displayName}
              placeholder="Enter name"
            />
            {/* sender Email  */}
            <label className="label text-secondary font-semibold text-lg">
              Sender Email
            </label>
            <input
              type="text"
              {...register("senderEmail")}
              className="input w-full"
              defaultValue={user?.email}
              placeholder="Enter mail"
            />
            {/* sender address  */}
            <label className="label text-secondary font-semibold text-lg">
              Sender Address
            </label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Enter Address"
            />

            {/* Sender Region  */}
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-secondary font-semibold text-lg">
                Sender Regions
              </legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender Districts */}
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-secondary font-semibold text-lg">
                Sender Districts
              </legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a districts"
                className="select w-full"
              >
                <option disabled={true}>Pick a Districts</option>
                {districtByRegions(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender Phone No  */}
            <label className="label text-secondary font-semibold text-lg">
              Sender Phone No
            </label>
            <input
              type="text"
              {...register("senderPhone")}
              className="input w-full"
              placeholder="Enter Phone"
            />
            {/* Pickup Instruction  */}
            <label className="label text-secondary font-semibold text-lg">
              Pickup Instruction
            </label>
            <textarea
              type="text"
              {...register("instructionSender")}
              className="input w-full p-3 h-30"
              rows="5"
              placeholder="Enter instruction......"
            />
          </fieldset>

          {/* receiver info  */}

          <fieldset className="fieldset mb-2">
            <h3 className="text-2xl font-extrabold mb-4 text-secondary">
              Receiver Details
            </h3>
            {/* Receiver name  */}
            <label className="label text-secondary font-semibold text-lg">
              Receiver Name
            </label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Enter name"
            />
            {/* Receiver Email  */}
            <label className="label text-secondary font-semibold text-lg">
              Receiver Email
            </label>
            <input
              type="text"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Enter email"
            />
            {/* Receiver address  */}
            <label className="label text-secondary font-semibold text-lg">
              Receiver Address
            </label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Enter Address"
            />

            {/* Receiver Region  */}
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-secondary font-semibold text-lg">
                Receiver Regions
              </legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver Districts */}
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-secondary font-semibold text-lg">
                Receiver Districts
              </legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a districts"
                className="select w-full"
              >
                <option disabled={true}>Pick a Districts</option>
                {districtByRegions(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver Phone No  */}
            <label className="label text-secondary font-semibold text-lg">
              Receiver Phone No
            </label>
            <input
              type="text"
              {...register("receiverPhone")}
              className="input w-full"
              placeholder="Receiver Phone"
            />
            {/* Pickup Instruction  */}
            <label className="label text-secondary font-semibold text-lg">
              Pickup Instruction
            </label>
            <textarea
              type="text"
              {...register("instructionReceiver")}
              className="input w-full p-3 h-30"
              rows="5"
              placeholder="Enter instruction......"
            />
          </fieldset>
        </div>

        <input
          type="submit"
          className="text-black btn  bg-green-500"
          value="send parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
