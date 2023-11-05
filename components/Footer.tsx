import React from "react";

const Footer = () => {
  return (
    <div className=" fixed bottom-0  w-full">
      <div className="h-[30px] gap-2 text-white px-3 flex items-center bg-[#2c303a]">
        <button className=" bg-[#5a5f73] cursor-not-allowed text-[0.8rem] px-[7px] py-[2px] rounded-sm ">
          Console
        </button>
        <button className=" bg-[#5a5f73] cursor-not-allowed text-[0.8rem] px-[7px] py-[2px] rounded-sm ">
          Assets
        </button>
        <button className=" bg-[#5a5f73] cursor-not-allowed text-[0.8rem] px-[7px] py-[2px] rounded-sm ">
          Shortcut
        </button>
      </div>
    </div>
  );
};

export default Footer;
