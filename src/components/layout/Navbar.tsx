"use client";
import React from "react";
import { Bell, MessageSquare, Search } from "lucide-react";
import Image from "next/image";
import { GoBellFill } from "react-icons/go";
import { MdMessage } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo with Play Button */}
          <div className="flex items-center space-x-1">
            <div className="shrink-0">
              <span className="text-xl font-bold text-black">GCR</span>
            </div>
            <FaPlay className="h-6 w-6 text-blue-500" />
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search something"
              />
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            {/* Excel Upload Button */}
            <button className="inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none">
              Excel Upload
            </button>

            {/* Notification Icons */}
            <div className="flex items-center space-x-5">
              <div className="relative">
                <GoBellFill className="h-6 w-6 text-black" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>

              <div className="relative">
                <MdMessage className="h-6 w-6 text-black" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>

              {/* Profile Image */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {/* <span className="text-xs font-medium text-gray-600">JD</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
