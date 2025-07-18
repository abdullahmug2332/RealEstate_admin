import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Card from '../components/Card';
import axios from "axios";
import { baseURL } from '../../API/baseURL';

export default function Properties() {
    const toggle = useSelector((state) => state.toggle.value);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        from: '',
        to: '',
        unit: '',
        type: '',
        rooms: '',
        bath: '',
        front: '',
        back: '',
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        axios.get(`${baseURL}/properties`)
            .then(res => {
                const availableProperties = res.data.filter(
                    (property) => property.soldout == false && property.rentedOut == false)
                    .sort((a, b) => b.id - a.id);
                
                setData(availableProperties);
                setFilteredData(availableProperties);
                console.log(availableProperties)
            })
            .catch(err => {
                console.error("Failed to fetch properties", err);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        const filtered = data.filter(item => {
            return (
                (filters.minPrice === '' || item.price >= Number(filters.minPrice)) &&
                (filters.maxPrice === '' || item.price <= Number(filters.maxPrice)) &&
                (filters.from === '' || item.measurement >= Number(filters.from)) &&
                (filters.to === '' || item.measurement <= Number(filters.to)) &&
                (filters.unit === '' || item.unit === filters.unit) &&
                (filters.type === '' || item.type === filters.type) &&
                (filters.rooms === '' || item.rooms === Number(filters.rooms)) &&
                (filters.bath === '' || item.bath === Number(filters.bath)) &&
                (filters.front === '' || item.front == Number(filters.front)) &&
                (filters.back === '' || item.back == Number(filters.back)) 
            );
        });
        setFilteredData(filtered);
    };

    const clearFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            from: '',
            to: '',
            unit: '',
            type: '',
            rooms: '',
            bath: '',
            front: '',
            back: '',
        });
        setFilteredData(data);
    };

    return (
        <div className={`${toggle === false ? "w-full" : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"} duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}>
            <h1 className='text-[30px] md:text-[40px]] font-semibold color'>All Properties</h1>
            <div className="w-full h-auto">
                <hr className="mt-[5px]" />
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-[10px]'>
                    <input type="number" name="minPrice" value={filters.minPrice} onChange={handleInputChange} placeholder="Min Price" />
                    <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleInputChange} placeholder="Max Price" />
                    <input type="number" name="from" value={filters.from} onChange={handleInputChange} placeholder="From" />
                    <input type="number" name="to" value={filters.to} onChange={handleInputChange} placeholder="To " />
                    <select name="unit" value={filters.unit} onChange={handleInputChange}>
                        <option value="">Unit</option>
                        <option value="marla">Marla</option>
                        <option value="kanal">Kanal</option>
                    </select>
                    <select name="type" value={filters.type} onChange={handleInputChange}>
                        <option value="">Type</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                    </select>
                    <input type="number" name="rooms" value={filters.rooms} onChange={handleInputChange} placeholder="Number of Beds" />
                    <input type="number" name="bath" value={filters.bath} onChange={handleInputChange} placeholder="Number of Baths" />
                    <input type="number" name="front" value={filters.front} onChange={handleInputChange} placeholder="Front Size " />
                    <input type="number" name="back" value={filters.back} onChange={handleInputChange} placeholder="Back Size" />
                </div>

                <div className="flex gap-4 mb-6">
                    <button onClick={applyFilters} className="bg-[#1e1e1f] text-white px-4 py-2 rounded">Apply</button>
                    <button onClick={clearFilters} className="bg-gray-300 px-4 py-2 rounded">Clear</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div key={index}>
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
                                rentedOut={item.rentedOut}
                                rentedByUs={item.rentedByUs}
                                rentedAt={item.rentedAt}
                                tenantName={item.tenantName}
                                ownerName={item.ownerName}
                                rentCommission={item.rentCommission}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No properties match your criteria.</p>
                )}
            </div>
        </div>
    );
}
