"use client";
import React from "react";
import { Search } from "lucide-react";
import { GoBellFill } from "react-icons/go";
import { MdMessage } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center py-3">
      {/* White container */}
      <nav className="w-[90%] max-w-6xl bg-white rounded-2xl shadow-md px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-1">
          <span className="text-xl font-semibold text-gray-900">GCR</span>
          <FaPlay className="h-4 w-4 text-blue-500" />
        </div>

        {/* Center: Excel Upload + Search */}
        <div className="flex items-center space-x-3 flex-1 max-w-xl mx-8">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
            Excel Upload
          </button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search something"
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-5">
          {/* Notification */}
          <div className="relative">
            <GoBellFill className="h-5 w-5 text-gray-800" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              2
            </span>
          </div>

          {/* Message */}
          <div className="relative">
            <MdMessage className="h-5 w-5 text-gray-800" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              3
            </span>
          </div>

          {/* Profile */}
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
