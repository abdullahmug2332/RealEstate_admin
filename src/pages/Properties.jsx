import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Card from '../components/Card';
import house from "../assets/house.jpeg";
import { useEffect } from 'react';
import axios from "axios";



export default function Properties() {
    const toggle = useSelector((state) => state.toggle.value);
    // const [data, setData] = useState([
    //     {
    //         price: 900000000,
    //         location: "Bahria Town - Jinnah Block",
    //         type: "rent",
    //         measurement: 4,
    //         unit: "marla",
    //         rooms: 3,
    //         bath: 2,
    //         front: 25,
    //         back: 45,
    //         description: "We will provide initial advice for free...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     },
    //     {
    //         price: 350000000,
    //         location: "DHA Phase 6 - Sector A",
    //         type: "sale",
    //         measurement: 5,
    //         unit: "marla",
    //         rooms: 4,
    //         bath: 3,
    //         front: 22,
    //         back: 38,
    //         description: "This modern and stylish home offers comfort...",
    //         media: [{ type: "image", src: house }],
    //         soldout: true
    //     },
    //     {
    //         price: 4800000,
    //         location: "Lake City - Sector M7",
    //         type: "rent",
    //         measurement: 10,
    //         unit: "marla",
    //         rooms: 5,
    //         bath: 4,
    //         front: 30,
    //         back: 32,
    //         description: "Located in one of the most desirable neighborhoods...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     },
    //     {
    //         price: 2600000,
    //         location: "Wapda Town - Block N2",
    //         type: "sale",
    //         measurement: 6,
    //         unit: "marla",
    //         rooms: 3,
    //         bath: 2,
    //         front: 24,
    //         back: 34,
    //         description: "Affordable and beautifully constructed...",
    //         media: [{ type: "image", src: house }],
    //         soldout: true
    //     },
    //     {
    //         price: 5300000,
    //         location: "Johar Town - Phase 2",
    //         type: "sale",
    //         measurement: 7,
    //         unit: "marla",
    //         rooms: 4,
    //         bath: 3,
    //         front: 26,
    //         back: 36,
    //         description: "A premium residential property...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     },
    //     {
    //         price: 4200000,
    //         location: "Al Rehman Garden - Phase 4",
    //         type: "sale",
    //         measurement: 5,
    //         unit: "marla",
    //         rooms: 3,
    //         bath: 2,
    //         front: 22,
    //         back: 30,
    //         description: "A peaceful, gated community...",
    //         media: [{ type: "image", src: house }],
    //         soldout: true
    //     },
    //     {
    //         price: 6200000,
    //         location: "Valencia Town - Block F1",
    //         type: "sale",
    //         measurement: 10,
    //         unit: "marla",
    //         rooms: 5,
    //         bath: 4,
    //         front: 35,
    //         back: 35,
    //         description: "This corner plot home offers spacious rooms...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     },
    //     {
    //         price: 3100000,
    //         location: "Gulshan-e-Ravi - Block H",
    //         type: "sale",
    //         measurement: 5,
    //         unit: "marla",
    //         rooms: 3,
    //         bath: 2,
    //         front: 23,
    //         back: 27,
    //         description: "Great investment opportunity...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     },
    //     {
    //         price: 8900000,
    //         location: "DHA Phase 8 - Ex Air Avenue",
    //         type: "sale",
    //         measurement: 12,
    //         unit: "marla",
    //         rooms: 6,
    //         bath: 5,
    //         front: 40,
    //         back: 45,
    //         description: "Luxury house with imported fittings...",
    //         media: [{ type: "image", src: house }],
    //         soldout: true
    //     },
    //     {
    //         price: 3800000,
    //         location: "Pak Arab Housing Scheme",
    //         type: "sale",
    //         measurement: 6,
    //         unit: "marla",
    //         rooms: 3,
    //         bath: 2,
    //         front: 28,
    //         back: 30,
    //         description: "Budget-friendly and ready to move in...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     },
    //     {
    //         price: 7500000,
    //         location: "Askari 11 - Sector B",
    //         type: "sale",
    //         measurement: 10,
    //         unit: "marla",
    //         rooms: 5,
    //         bath: 4,
    //         front: 30,
    //         back: 32,
    //         description: "Well-maintained house in a secured Army-managed society...",
    //         media: [{ type: "image", src: house }],
    //         soldout: true
    //     },
    //     {
    //         price: 2900000,
    //         location: "Model Town Extension - Block L",
    //         type: "sale",
    //         measurement: 5,
    //         unit: "marla",
    //         rooms: 3,
    //         bath: 2,
    //         front: 25,
    //         back: 29,
    //         description: "A budget-friendly property...",
    //         media: [{ type: "image", src: house }],
    //         soldout: false
    //     }
    // ]);
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        axios.get("http://localhost:5000/properties")
            .then(res => {
                const availableProperties = res.data.filter(
                    (property) => property.status === "available"
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
            <h1 className='text-[40px] font-semibold color '>All Properties</h1>
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
