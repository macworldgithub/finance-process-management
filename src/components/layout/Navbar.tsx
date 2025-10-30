// "use client";
// import React from "react";
// import { Bell, MessageSquare, Search } from "lucide-react";
// import Image from "next/image";
// import { GoBellFill } from "react-icons/go";
// import { MdMessage } from "react-icons/md";
// import { FaPlay } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <nav className="bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Left: Logo with Play Button */}
//           <div className="flex items-center space-x-1">
//             <div className="shrink-0">
//               <span className="text-xl font-bold text-black">GCR</span>
//             </div>
//             <FaPlay className="h-6 w-6 text-blue-500" />
//           </div>

//           {/* Center: Search Bar */}
//           <div className="flex-1 max-w-2xl mx-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Search something"
//               />
//             </div>
//           </div>

//           {/* Right: Icons */}
//           <div className="flex items-center space-x-4">
//             {/* Excel Upload Button */}
//             <button className="inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none">
//               Excel Upload
//             </button>

//             {/* Notification Icons */}
//             <div className="flex items-center space-x-5">
//               <div className="relative">
//                 <GoBellFill className="h-6 w-6 text-black" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   2
//                 </span>
//               </div>

//               <div className="relative">
//                 <MdMessage className="h-6 w-6 text-black" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   3
//                 </span>
//               </div>

//               {/* Profile Image */}
//               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
//                 {/* <span className="text-xs font-medium text-gray-600">JD</span> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import React from "react";
import { Search } from "lucide-react";
import { GoBellFill } from "react-icons/go";
import { MdMessage } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center py-3 ">
      {/* White container */}
      <nav className="w-[96%] max-w-[1600px] bg-white rounded-2xl shadow-md px-6 py-3 flex items-center justify-between">
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
