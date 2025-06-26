import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { IoIosHome } from "react-icons/io";
import { TbHomeEco } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";



export default function Dashboard() {
    const toggle = useSelector((state) => state.toggle.value);
  const [filter, setFilter] = useState("year"); // Options: year, month, week
  const [chartData, setChartData] = useState([]);

  const saleProperties = 245;
  const rentProperties = 130;
  const dealsDone = 78;
  const totalProfit = 55;

  useEffect(() => {
    const generateDummyChartData = () => {
      if (filter === "year") {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames.map((month) => ({
          name: month,
          count: Math.floor(Math.random() * 20) + 5
        }));
      } else if (filter === "month") {
        return Array.from({ length: 30 }, (_, i) => ({
          name: `${i + 1}`,
          count: Math.floor(Math.random() * 5) + 1
        }));
      } else {
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return weekDays.map((day) => ({
          name: day,
          count: Math.floor(Math.random() * 10) + 2
        }));
      }
    };

    setChartData(generateDummyChartData());
  }, [filter]);

  return (
    <div
      className={`${toggle === false
        ? "w-full"
        : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
        } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6 `}
    >
      <h1 className='text-[40px] font-semibold color '>Dashboard</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-1'>
        <Card icon={<IoIosHome className='text-5xl' />} title="Sale Properties" count={saleProperties} />
        <Card icon={<TbHomeEco className='text-5xl' />} title="Rent Properties" count={rentProperties} />
        <Card icon={<FaHandshake className='text-5xl' />} title="Deals Done" count={dealsDone} />
        <Card icon={<BsCashCoin className='text-5xl' />} title="Total Profit" count={totalProfit} />
      </div>

      {/* Chart */}
      <div className="my-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1e1e1f]">Listings Overview</h2>
          {/* select */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-[#1e1e1f] text-[#1e1e1f] rounded px-3 py-1 focus:outline-none"
          >
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>
        <ResponsiveContainer height={400} width="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1e1e1f"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationBegin={300}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
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
    <div>
      <p className='text-lg font-medium group-hover:text-white'>{title}</p>
      <p className='text-xl font-bold text-[#1e1e1f] group-hover:text-white'>{count}+</p>
    </div>
  </div>
);
