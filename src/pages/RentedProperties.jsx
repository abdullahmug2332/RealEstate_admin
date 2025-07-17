import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../components/Card";
import { baseURL } from "../../API/baseURL";

export default function RentedProperties() {
  const toggle = useSelector((state) => state.toggle.value);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "byUs", "notByUs"
  const [allRented, setAllRented] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get(`${baseURL}/properties`)
      .then((res) => {
        const rentedProperties = res.data.filter(
          (property) => property.rentedOut === 1 || property.rentedOut === true
        );
        setAllRented(rentedProperties);
        setData(rentedProperties);
      })
      .catch((err) => {
        console.error("Failed to fetch properties", err);
      });
  }, []);

  useEffect(() => {
    let filteredData = [...allRented];
    if (filter === "byUs") {
      filteredData = filteredData.filter(
        (item) => item.rentedByUs === 1 || item.rentedByUs === true
      );
    } else if (filter === "notByUs") {
      filteredData = filteredData.filter(
        (item) => item.rentedByUs === 0 || item.rentedByUs === false
      );
    }
    setData(filteredData);
  }, [filter, allRented]);

  return (
    <div
      className={`${
        toggle === false
          ? "w-full"
          : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
      } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}
    >
      <h1 className="text-[30px] md:text-[40px] font-semibold mb-4">Rented Properties</h1>

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-6"
      >
        <option value="all">All Rented</option>
        <option value="byUs">Rented By Us</option>
        <option value="notByUs">Rented By Others</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item, index) => (
          <div
            key={index}
            // If you use framer-motion or animation lib, keep these
            // initial={{ opacity: 0, y: 50 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              id={item.id}
              image={item.media[0]?.src}
              media={item.media}
              price={item.price}
              location={item.location}
              type={item.type}
              measurement={item.measurement}
              unit={item.unit}
              rooms={item.rooms}
              bath={item.bath}
              front={item.front}
              back={item.back}
              description={item.description}
              rentedOut={item.rentedOut}
              rentedByUs={item.rentedByUs}
              tenantName={item.tenantName}
              landlordName={item.landlordName}
              rentAmount={item.rentAmount}
              rentedAt={item.rentedAt}
              createdAt={item.createdAt}
              status={item.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
