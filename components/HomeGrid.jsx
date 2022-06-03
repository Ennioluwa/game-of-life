import React from "react";

const HomeGrid = () => {
  return (
    <div className=" relative min-h-screen w-full p-5">
      <div className="gap-2 sm:gap-5 bg-blue-100 p-2 sm:p-5 w-fit rounded mx-auto  flex items-center justify-between">
        <button className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer">
          Start
        </button>
        <button className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer">
          Random
        </button>
        <button className=" bg-white font-semibold hover:bg-blue-50 px-4 py-2 rounded text-blue-600 cursor-pointer">
          Reset
        </button>
        <div className=" text-center text-blue-600">
          <span>Interval: </span>
          <input
            className=" text-blue-600 font-semibold focus:ring focus:ring-blue-300 w-20 p-1 rounded bg-white focus:outline-none border border-blue-300"
            type="number"
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeGrid;
