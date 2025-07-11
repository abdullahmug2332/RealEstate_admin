import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProperty = () => {
  const toggle = useSelector((state) => state.toggle.value);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    price: "",
    location: "",
    type: "sale",
    measurement: "",
    unit: "marla",
    rooms: "",
    bath: "",
    front: "",
    back: "",
    description: "",
    media: [],
    soldout: false,
    soldByUs: false,
    buyerName: "",
    sellerName: "",
    commission: 0,
    createdAt: "",
    soldAt: "",
    soldAmount: "",

    // Rental fields added
    rentedOut: false,
    rentedByUs: false,
    tenantName: "",
    landlordName: "",
    rentAmount: "",
    rentedAt: "",
  });

  const [newMedia, setNewMedia] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`http://localhost:5000/properties/${id}`);
      const data = await res.json();

      // Convert string/number boolean fields to actual booleans if needed
      data.soldout = Boolean(data.soldout);
      data.soldByUs = Boolean(data.soldByUs);
      data.rentedOut = Boolean(data.rentedOut);
      data.rentedByUs = Boolean(data.rentedByUs);

      setFormData(data);
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") {
      const filesArray = Array.from(files).map((file) => ({
        file,
        src: URL.createObjectURL(file),
        type: file.type.startsWith("image") ? "image" : "video",
      }));
      setNewMedia((prev) => [...prev, ...filesArray]);
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "media") payload.append(key, value);
    });
    newMedia.forEach((m) => payload.append("media", m.file));
    payload.append("oldMedia", JSON.stringify(formData.media));
    try {
      const res = await fetch(`http://localhost:5000/properties/${id}`, {
        method: "PUT",
        body: payload,
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Updated successfully");
      navigate(`/property/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating property");
    }
  };

  const removeOldMedia = (idx) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== idx),
    }));
  };

  const removeNewMedia = (idx) => {
    setNewMedia((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div
      className={`${toggle === false
        ? "w-full"
        : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
        } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6 `}
    >
      <form onSubmit={handleSubmit} className=" space-y-4">
        <h1 className="text-[30px] md:text-[40px] font-bold mt-3">Edit Property</h1>
        <div className="flex gap-1">
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input"
            placeholder="Price"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input"
          >
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
        </div>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input"
          placeholder="Location"
        />

        <div className="flex gap-1">
          <input
            name="measurement"
            value={formData.measurement}
            onChange={handleChange}
            className="input"
            placeholder="Measurement"
          />
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="input"
          >
            <option value="marla">Marla</option>
            <option value="kanal">Kanal</option>
          </select>
        </div>
        <div className="flex gap-1">
          <input
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="input"
            placeholder="Rooms"
          />
          <input
            name="bath"
            value={formData.bath}
            onChange={handleChange}
            className="input"
            placeholder="Bath"
          />
        </div>
        <div className="flex gap-1">
          <input
            name="front"
            value={formData.front}
            onChange={handleChange}
            className="input"
            placeholder="Front"
          />
          <input
            name="back"
            value={formData.back}
            onChange={handleChange}
            className="input"
            placeholder="Back"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          placeholder="Description"
        />

        {/* Sold Fields */}

        <div className="flex gap-1 ">
          {formData.type == "sale" && (
            <div className="w-full">
              <label>
                Sold Out
                <input
                  type="checkbox"
                  name="soldout"
                  className="w-[20px]"
                  checked={formData.soldout}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {formData.soldout && (
            <div className="w-full">
              <label>
                Sold By Us
                <input
                  type="checkbox"
                  name="soldByUs"
                  className="w-[20px]"
                  checked={formData.soldByUs}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
        </div>

        {formData.soldout && (
          <>
            <input
              type="date"
              name="soldAt"
              value={formData.soldAt?.slice(0, 10)}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              name="soldAmount"
              value={formData.soldAmount || ""}
              onChange={handleChange}
              className="input"
              placeholder="Sold Amount"
            />
            {formData.soldByUs && (
              <>
                <input
                  name="buyerName"
                  value={formData.buyerName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Buyer Name"
                />
                <input
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Seller Name"
                />
                <input
                  name="commission"
                  type="number"
                  value={formData.commission}
                  onChange={handleChange}
                  className="input"
                  placeholder="Commission"
                />
              </>
            )}
          </>
        )}

        {/* Rent Fields */}
        <div className="flex gap-1 mt-4">
          {formData.type == "rent" && (
            <div className="w-full">
              <label>
                Rented Out
                <input
                  type="checkbox"
                  name="rentedOut"
                  className="w-[20px]"
                  checked={formData.rentedOut}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}


          {formData.rentedOut && (
            <div className="w-full">
              <label>
                Rented By Us
                <input
                  type="checkbox"
                  name="rentedByUs"
                  className="w-[20px]"
                  checked={formData.rentedByUs}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
        </div>

        {formData.rentedOut && (
          <>
            <input
              type="date"
              name="rentedAt"
              value={formData.rentedAt?.slice(0, 10)}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              name="rentAmount"
              value={formData.rentAmount || ""}
              onChange={handleChange}
              className="input"
              placeholder="Rent Amount"
            />

            {formData.rentedByUs && (
              <>
                <input
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Tenant Name"
                />
                <input
                  name="landlordName"
                  value={formData.landlordName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Landlord Name"
                />
                <input
                  name="commission"
                  type="number"
                  value={formData.commission}
                  onChange={handleChange}
                  className="input"
                  placeholder="Commission"
                />
              </>
            )}
          </>
        )}

        <input type="file" multiple onChange={handleChange} className="input" />

        <div className="flex gap-2 flex-wrap">
          {formData.media.map((m, i) => (
            <div key={i} className="relative">
              {m.type === "image" ? (
                <img
                  src={`http://localhost:5000/images/${m.src}`}
                  className="w-24 h-24"
                  alt=""
                />
              ) : (
                <video
                  src={`http://localhost:5000/images/${m.src}`}
                  className="w-24 h-24"
                  controls
                />
              )}
              <button
                type="button"
                onClick={() => removeOldMedia(i)}
                className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-10"
              >
                x
              </button>
            </div>
          ))}
          {newMedia.map((m, i) => (
            <div key={i} className="relative">
              {m.type === "image" ? (
                <img src={m.src} className="w-24 h-24" alt="" />
              ) : (
                <video src={m.src} className="w-24 h-24" controls />
              )}
              <button
                type="button"
                onClick={() => removeNewMedia(i)}
                className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-10"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
