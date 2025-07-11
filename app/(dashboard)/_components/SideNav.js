"use client";
import { File, Shield, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SideNav = ({ closeSideBar, isMobile }) => {
  const menuList = [
    { id: 1, name: "Upload", icon: Upload, path: "/upload" },
    { id: 2, name: "Files", icon: File, path: "/files" },
    { id: 3, name: "Upgrade", icon: Shield, path: "/upgrade" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="shadow-sm border-r h-full flex flex-col bg-white w-64">
      {/* Header */}
      <div className="p-5 border-b flex items-center justify-between">
        <Image src="/logo.svg" width={46} height={100} alt="Logo" />
        {isMobile && (
          <button onClick={closeSideBar} className="md:hidden">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>

      {/* Menu List */}
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center gap-2 p-4 px-6 w-full text-gray-500 hover:bg-gray-100 ${
              activeIndex === index ? "bg-blue-50" : ""
            }`}
            onClick={() => {
              setActiveIndex(index);
              closeSideBar(); // Hide sidebar on mobile after click
            }}
          >
            <item.icon className="w-5 h-5" />
            <h2 className="text-sm">{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
