import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const PropertyForm = ({ onSubmit }) => {
  const navigate = useNavigate();
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
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const fileArray = Array.from(files).map((file) => {
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
        media: [...prev.media, ...fileArray],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    // Append regular fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "media") {
        formPayload.append(key, value);
      }
    });

    // Append media files
    formData.media.forEach((item) => {
      formPayload.append("media", item.file); // field name must match multer
    });

    formPayload.append("soldout", false);
    formPayload.append("soldByUs", false);
    formPayload.append("buyerName", " ");
    formPayload.append("sellerName", " ");
    formPayload.append("commission", 0);
    formPayload.append("createdAt", new Date().toISOString());
    formPayload.append("soldAt", "");

    try {
      const response = await fetch("http://localhost:5000/properties", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error creating property:", data.error);
        alert("Failed to add property.");
        return;
      }

      alert("Property added successfully!");
      setFormData({
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
      });
      navigate("/properties")

    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred while adding the property.");
    }
  };
  const removeMedia = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, index) => index !== indexToRemove),
    }));
  };



  return (
    <div
      className={`${toggle === false
        ? "w-full"
        : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
        } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg">
        <h1 className="text-[30px] md:text-[40px] font-semibold">Add Property</h1>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="input"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="input"
        >
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>

        <input
          type="number"
          name="measurement"
          placeholder="Measurement"
          value={formData.measurement}
          onChange={handleChange}
          className="input"
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

        <input
          type="number"
          name="rooms"
          placeholder="Rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="bath"
          placeholder="Bathrooms"
          value={formData.bath}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="front"
          placeholder="Front"
          value={formData.front}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="back"
          placeholder="Back"
          value={formData.back}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input"
        />

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleChange}
          className="input"
        />

        <div className="flex gap-4 flex-wrap">
          {formData.media.map((item, index) => (
            <div key={index} className="relative w-24 h-24">
              <button
                type="button"
                onClick={() => removeMedia(index)}
                className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-10"
                title="Remove"
              >
                ×
              </button>

              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt="preview"
                  className="w-full h-full object-cover rounded-[2px]"
                />
              ) : item.type === "video" ? (
                <video
                  src={item.src}
                  controls
                  className="w-full h-full object-cover rounded-[2px]"
                />
              ) : null}
            </div>
          ))}
        </div>


        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
