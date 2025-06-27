import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Card from '../components/Card';
import house from "../assets/house.jpeg";
import { useEffect } from 'react';
import axios from "axios";



export default function SoldProperties() {
    const toggle = useSelector((state) => state.toggle.value);
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        axios.get("http://localhost:5000/properties")
            .then(res => {
                const availableProperties = res.data.filter(
                    (property) => property.status === "sold"
                );
                setData(availableProperties);
            })
            .catch(err => {
                console.error("Failed to fetch properties", err);
            });
    }, []);

    return (
        <div
            className={`${toggle === false
                ? "w-full"
                : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
                } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6 `}
        >
            <h1 className='text-[40px] font-semibold color '>Sold Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
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
    )
}
