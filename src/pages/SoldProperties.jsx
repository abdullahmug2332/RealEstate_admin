import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import Card from '../components/Card';
import { baseURL } from '../../API/baseURL';

export default function SoldProperties() {
    const toggle = useSelector((state) => state.toggle.value);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("all"); // "all", "byUs", "notByUs"
    const [allSold, setAllSold] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        axios.get(`${baseURL}/properties`)
            .then(res => {
                const soldProperties = res.data.filter(
                    (property) => property.soldout === 1 || property.soldout === true
                );
                setAllSold(soldProperties);
                setData(soldProperties);
            })
            .catch(err => {
                console.error("Failed to fetch properties", err);
            });
    }, []);

    useEffect(() => {
        let filteredData = [...allSold];
        if (filter === "byUs") {
            filteredData = filteredData.filter((item) => item.soldByUs === 1 || item.soldByUs === true);
        } else if (filter === "notByUs") {
            filteredData = filteredData.filter((item) => item.soldByUs === 0 || item.soldByUs === false);
        }
        setData(filteredData);
    }, [filter, allSold]);

    return (
        <div
            className={`${toggle === false
                ? "w-full"
                : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"} duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}
        >
            <h1 className='text-[30px] md:text-[40px] font-semibold mb-4'>Sold Properties</h1>

            {/* Filter Dropdown */}
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mb-6"
            >
                <option value="all">All Sold</option>
                <option value="byUs">Sold By Us</option>
                <option value="notByUs">Not Sold By Others</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.map((item, index) => (
                    <div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
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
                            soldout={item.soldout}
                            soldByUs={item.soldByUs}
                            buyerName={item.buyerName}
                            sellerName={item.sellerName}
                            commission={item.commission}
                            createdAt={item.createdAt}
                            soldAt={item.soldAt}
                            status={item.status}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
