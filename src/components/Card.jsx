import React from 'react'
import { TbRulerMeasure2 } from "react-icons/tb";
import { FaBed } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { baseURL } from "../../API/baseURL"


export default function Card(props) {
  function formatPrice(price) {
    const num = parseInt(price, 10);

    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + " Crore";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + " Lac";
    } else {
      return num.toLocaleString();
    }
  }

  return (
    <Link to={`/property/${props.id}`} className='hover:scale-[1.02] cursor-pointer duration-500'>
      <div className="bg-white rounded-md overflow-hidden  relative shadow-2xl hover:scale-[1.02] duration-500 cursor-pointer">
        <p className='bg-white absolute top-2 right-2 text-[#2C2C2C] font-semibold px-[10px] text-[15px] py-[5px] rounded-[5px]'>For {props.type.charAt(0).toUpperCase() + props.type.slice(1)}</p>
        <img
          src={`${baseURL}/images/${props.image}`}
          alt="Property"
          className="w-full h-[250px] object-cover object-center"
        />
        <div className="p-4 bg-white min-h-[150px]  flex flex-col relative">
          <p
            className={`text-md absolute top-3 right-3 font-semibold ${props.soldout || props.rentedOut ? 'text-red-600' : 'text-green-600'
              }`}
          >
            {props.soldout || props.rentedOut ? 'Not Available' : 'Available'}
          </p>

          <p className="text-xl font-semibold text-[#2C2C2C]  ">PKR {formatPrice(props.price)}</p>
          <p className="text-sm  mt-1 text-[#2C2C2C] ">{props.location}</p>
          <p className="text-sm text-[#2C2C2C] ">{props.measurement} {props.unit} <TbRulerMeasure2 className='inline' /> | {props.rooms} <FaBed className='inline text-[13px]' /> | {props.bath} <FaBath className='inline text-[13px]' /></p>
          <p className="text-[13px] mt-2 ">
            {props.description.length > 100
              ? props.description.slice(0, 100) + "..."
              : props.description}
          </p>

        </div>
      </div>
    </Link>
  )
}
