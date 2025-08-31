"use client";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800 bg-gradient-to-br from-black via-gray-900 to-indigo-950">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-red-500">MovieHub 🎬</h1>
        <input
          type="text"
          placeholder="Search..."
          className="ml-4 w-64 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
        />
      </div>
      <nav className="flex space-x-4">
        <a href="#" className="text-red-500 hover:underline">
          Home
        </a>
        <Link href="/mylist" className="text-red-500 hover:underline top-1">
          My List
        </Link>
        <a href="/login">
          <button className="bg-red-500 text-black px-4 py-2 rounded-[14px]">Sign In</button>
        </a>
      </nav>
    </header>
  );
};

export default NavBar;
