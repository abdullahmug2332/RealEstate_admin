import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditHomeData = () => {
  const toggle = useSelector((state) => state.toggle.value);

  return (
    <>
      <div
        className={`${
          toggle === false
            ? "w-full"
            : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
        } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6 space-y-9`}
      >
        <h1 className="color text-[32px] font-semibold my-[10px]">
          Hero Section
        </h1>
      </div>
    </>
  );
};

export default EditHomeData;
