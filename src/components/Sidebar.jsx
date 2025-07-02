import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { AiTwotoneIdcard } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { FaListCheck } from "react-icons/fa6";
import logo from "../assets/footerlogo.png"; // Update the path to your logo image
import { FaUsers } from "react-icons/fa6";
import { TbHomeCheck } from "react-icons/tb";
import { MdAddHome } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  const toggle = useSelector((state) => state.toggle.value);

  return (
    <section
      className={`${
        toggle ? "translate-x-[0px]" : "-translate-x-[100%]"
      } ${isAuthPage ? "hidden" : "block"} w-[40%] sm:w-[30%] md:w-[20%] lg:w-[20%] xl:w-[15%] 2xl:w-[13%] h-[100vh] duration-500 bg fixed top-0 z-[20]`}
    >
      <img
        src={logo}
        alt="Logo"
        className="w-[90%] mx-auto mt-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
      />

      <div className="flex flex-col ml-[20px] sm:ml-[30px] lg:ml-[30px] gap-[20px] mt-[90px]">
        <Link
          to="/"
          className="flex items-center gap-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
        >
          <VscGraph className="text-[21px] text-white" />
          <div className="text-white text-[16px] font-semibold">Dashboard</div>
        </Link>
        <Link
          to="/users"
          className="flex items-center gap-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
        >
          <FaUsers className="text-[21px] text-white" />
          <div className="text-white text-[16px] font-semibold">All Users</div>
        </Link>
        <Link
          to="/properties"
          className="flex items-center gap-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
        >
          <IoHome className="text-[21px] text-white" />
          <div className="text-white text-[16px] font-semibold">Properties</div>
        </Link>
        <Link
          to="/addproperty"
          className="flex items-center gap-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
        >
          <MdAddHome className="text-[21px] text-white" />
          <div className="text-white text-[16px] font-semibold">Add Property</div>
        </Link>
        <Link
          to="/soldproperties"
          className="flex items-center gap-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
        >
          <TbHomeCheck className="text-[21px] text-white" />
          <div className="text-white text-[16px] font-semibold">Sold Properties</div>
        </Link>
        <Link
          to="/rentedproperties"
          className="flex items-center gap-[10px] hover:scale-[1.06] duration-300 cursor-pointer"
        >
          <FaListCheck className="text-[21px] text-white" />
          <div className="text-white text-[16px] font-semibold">Rented Properties</div>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
