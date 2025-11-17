import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
    //   console.log(district, coord);
      mapRef.current.flyTo(coord, 12);
    }
  };

  return (
    <div className="px-4 md:px-6 lg:px-10">
      <h3 className="text-2xl md:text-3xl font-bold my-4">
        We are available in 64 districts
      </h3>

      {/* Search box */}
      <div className="relative w-full md:w-2/3 lg:w-1/2">
        <form onSubmit={handleSearch}>
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="text"
            name="location"
            placeholder="Search anything..."
            className="w-full pl-12 pr-4 py-3 my-4 rounded-xl bg-white shadow-sm focus:shadow-md border border-gray-200 focus:border-teal-500 outline-none transition-all duration-200 text-gray-700"
          />
        </form>
      </div>

      {/* Map */}
      <div className="w-full h-[400px] md:h-[600px] lg:h-[800px] mb-8 rounded-xl overflow-hidden shadow">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="p-3 max-w-[200px]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {center.district}
                  </h3>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold text-teal-700">
                        Service Area:
                      </span>
                      <br />
                      {center.covered_area.join(", ")}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
