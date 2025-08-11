import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { IoIosHome } from "react-icons/io";
import { TbHomeEco } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import axios from "axios";
import { baseURL } from '../../API/baseURL';

export default function Dashboard() {
  const toggle = useSelector((state) => state.toggle.value);
  const [filter, setFilter] = useState("year");
  const [chartData, setChartData] = useState([]);

  const [soldPropertiesByUs, setSoldPropertiesByUs] = useState(0);
  const [rentedPropertiesByUs, setRentedPropertiesByUs] = useState(0);
  const [totalSoldDeals, setTotalSoldDeals] = useState(0);
  const [totalRentedDeals, setTotalRentedDeals] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${baseURL}/stats`);
        setSoldPropertiesByUs(res.data.soldPropertiesByUs);
        setRentedPropertiesByUs(res.data.rentedPropertiesByUs);
        setTotalSoldDeals(res.data.totalSoldDeals);
        setTotalRentedDeals(res.data.totalRentedDeals);
        setTotalDeals(res.data.totalDeals);
        setTotalCommission(res.data.totalCommission);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`${baseURL}/time-stats?filter=${filter}`);
        setChartData(res.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchChartData();
  }, [filter]);

  return (
    <div className={`${toggle === false ? "w-full" : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"} duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}>
      <h1 className='text-[30px] md:text-[40px] font-semibold color '>Dashboard</h1>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1'>
        <Card icon={<IoIosHome className='text-5xl' />} title="Sale Properties" count={soldPropertiesByUs} />
        <Card icon={<TbHomeEco className='text-5xl' />} title="Rent Properties" count={rentedPropertiesByUs} />
        <Card icon={<FaHandshake className='text-5xl' />} title="Deals Done" count={totalDeals} />
        <Card icon={<BsCashCoin className='text-5xl' />} title="Total Profit" count={totalCommission} />
      </div>

      {/* Chart */}
      <div className="my-12 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1e1e1f]">Listings Overview</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border w-[100px] border-[#1e1e1f] text-[#1e1e1f] rounded px-3 py-1 focus:outline-none"
          >
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>
        <div className='overflow-x-scroll '>
          <ResponsiveContainer height={400} width="100%" className=" !min-w-[700px] ">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sold" stroke="#aa1111" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Sold" />
            <Line type="monotone" dataKey="rented" stroke="#06665a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Rented" />
          </LineChart>
        </ResponsiveContainer>
        </div>
        
      </div>
    </div>
  );
}

// Reusable card component
const Card = ({ icon, title, count }) => (
  <div className='group border-2 rounded-lg border-[#1e1e1f] hover:bg-[#1e1e1f] transition duration-300 px-2 xl:px-4 py-3 flex items-center gap-4 cursor-pointer'>
    <div className='text-[#1e1e1f] group-hover:text-white'>
      {icon}
    </div>
    <div className='flex flex-row lg:flex-col items-center lg:items-start w-full'>
      <p className='text-lg font-medium group-hover:text-white'>{title}</p>
      <p className='text-xl font-bold text-[#1e1e1f] group-hover:text-white ml-auto lg:ml-0'>{count}</p>
    </div>
  </div>
);
