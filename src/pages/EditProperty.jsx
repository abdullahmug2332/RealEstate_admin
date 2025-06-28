import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProperty = () => {
    const navigate =useNavigate();
  const { id } = useParams();
  const toggle = useSelector((state) => state.toggle.value);
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
    status: "available",
    soldout: false,
    soldByUs: false,
    buyerName: "",
    sellerName: "",
    commission: 0,
    soldAt: "",
    createdAt: "",
  });

  // Fetch existing property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/properties/${id}`);
        const data = await res.json();
        if (res.ok) {
          const mediaFormatted = data.media?.map((item) => ({
            type: item.type,
            src: `http://localhost:5000/images/${item.src}`,
            file: null, // existing files don't need file objects
          })) || [];

          setFormData({ ...data, media: mediaFormatted });
        } else {
          alert("Property not found!");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load property");
      }
    };

    fetchProperty();
  }, [id]);

const handleChange = (e) => {
  const { name, type, value, files, checked } = e.target;

  if (type === "file") {
    const newFiles = Array.from(files).map((file) => {
      const fileType = file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
        ? "video"
        : "other";

      return {
        type: fileType,
        src: URL.createObjectURL(file),
        file,
      };
    });

    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, ...newFiles],
    }));
  } else {
    let newValue = type === "checkbox" ? checked : value;

    // 🛠 Convert specific values to boolean if needed
    if (name === "soldByUs" || name === "soldout") {
      newValue = value === "true" || checked; // checkbox or select
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }
};


  const removeMedia = (index) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    // Append fields (except media)
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "media") formPayload.append(key, value);
    });

    // Only append new media files (with file object)
    formData.media.forEach((item) => {
      if (item.file) {
        formPayload.append("media", item.file);
      }
    });

    try {
      const res = await fetch(`http://localhost:5000/properties/${id}`, {
        method: "PUT",
        body: formPayload,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update failed:", data.error);
        alert("Failed to update property");
        return;
      }

      alert("Property updated successfully!");
      navigate(`/property/${id}`)
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while updating.");
    }
  };

  return (
    <div className={`${toggle ? "md:w-[80%] lg:w-[82%] xl:w-[85%]" : "w-full"} ml-auto py-6 px-6 mt-[40px] duration-500`}>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
        <h1 className="text-[40px] font-semibold">Edit Property</h1>

        <input className="input" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input className="input" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />

        <select className="input" name="type" value={formData.type} onChange={handleChange}>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>

        <input className="input" type="number" name="measurement" value={formData.measurement} onChange={handleChange} placeholder="Measurement" />

        <select className="input" name="unit" value={formData.unit} onChange={handleChange}>
          <option value="marla">Marla</option>
          <option value="kanal">Kanal</option>
        </select>

        <input className="input" type="number" name="rooms" value={formData.rooms} onChange={handleChange} placeholder="Rooms" />
        <input className="input" type="number" name="bath" value={formData.bath} onChange={handleChange} placeholder="Bathrooms" />
        <input className="input" type="number" name="front" value={formData.front} onChange={handleChange} placeholder="Front" />
        <input className="input" type="number" name="back" value={formData.back} onChange={handleChange} placeholder="Back" />

        <textarea className="input" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

        <input className="input" type="file" multiple accept="image/*,video/*" onChange={handleChange} />

        <div className="flex gap-3 flex-wrap">
          {formData.media.map((item, index) => (
            <div key={index} className="relative group">
              {item.type === "image" ? (
                <img src={item.src} alt="media" className="w-24 h-24 object-cover rounded" />
              ) : item.type === "video" ? (
                <video src={item.src} controls className="w-24 h-24 object-cover rounded" />
              ) : null}
              <button type="button" onClick={() => removeMedia(index)} className="absolute top-1 right-1 text-white bg-black rounded-full px-2 text-xs">✕</button>
            </div>
          ))}
        </div>

        {/* Sold Info - Show only if status is 'sold' */}
        {formData.status === "sold" && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg space-y-4">
            <h2 className="text-xl font-bold">Sold Info</h2>
            <input className="input" type="text" name="buyerName" value={formData.buyerName} onChange={handleChange} placeholder="Buyer Name" />
            <input className="input" type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} placeholder="Seller Name" />
            <input className="input" type="number" name="commission" value={formData.commission} onChange={handleChange} placeholder="Commission" />
            <input className="input" type="datetime-local" name="soldAt" value={formData.soldAt?.slice(0, 16)} onChange={handleChange} />
<label className="flex flex-col gap-1">
  <span>Sold by us</span>
  <select
    name="soldByUs"
    value={formData.soldByUs ? "true" : "false"}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        soldByUs: e.target.value === "true",
      }))
    }
    className="input"
  >
    <option value="false">No</option>
    <option value="true">Yes</option>
  </select>
</label>


          </div>
        )}

        <button type="submit" className="btn">Update Property</button>
      </form>
    </div>
  );
};

export default EditProperty;
