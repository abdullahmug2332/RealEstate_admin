import React, { useState } from "react";
import { useSelector } from "react-redux";

const PropertyForm = ({ onSubmit }) => {
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

    try {
      const response = await fetch("http://localhost:5000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: formData.price,
          location: formData.location,
          type: formData.type,
          measurement: formData.measurement,
          unit: formData.unit,
          rooms: formData.rooms,
          bath: formData.bath,
          front: formData.front,
          back: formData.back,
          description: formData.description,
          media: formData.media,
          soldout:false,
          soldByUs:false,
          buyerName:" ",
          sellerName:" ",
          commission:0,
          createdAt:new Date().toISOString(),
          soldAt:null,
          status:"available"
        }),
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
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred while adding the property.");
    }
  };

  return (
    <div
      className={`${
        toggle === false
          ? "w-full"
          : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
      } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg">
        <h1 className="text-[40px] font-semibold">Add Property</h1>

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
          {formData.media.map((item, index) =>
            item.type === "image" ? (
              <img
                key={index}
                src={item.src}
                alt="preview"
                className="w-24 h-24 object-cover rounded-[2px]"
              />
            ) : item.type === "video" ? (
              <video
                key={index}
                src={item.src}
                controls
                className="w-24 h-24 object-cover rounded-[2px]"
              />
            ) : null
          )}
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
