import React, { useState } from "react";
import logo from "../assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
function MobileNavbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="w-full relative">
      <div className="w-full  bg-gradient-to-t  from-[#f3078998] to-[#000000e8] shadow-xl px-4 py-4 flex justify-between items-center">
        <div className=" w-14 h-14 block ">
          <Image
            src="/logo.svg"
            className=" "
            height={200}
            width={200}
            layout="intrinsic"
          />
        </div>
        <div
          className=" w-12 h-10 border-4 rounded-sm flex flex-col justify-evenly border-white"
          onClick={() => setNavOpen(!navOpen)}
        >
          <div
            className={
              !navOpen
                ? " w-8 pt-0.5  bg-white mx-auto transition  duration-200 ease-in-out"
                : " w-10 pt-0.5   bg-white mx-auto transform rotate-[38deg] -translate-x- translate-y-1.5 transition  duration-200 ease-in-out "
            }
          ></div>
          <div
            className={
              !navOpen
                ? " w-8 pt-0.5  bg-white mx-auto transition  duration-200 ease-in-out"
                : "hidden transition  duration-200 ease-in-out"
            }
          ></div>
          <div
            className={
              !navOpen
                ? " w-8 pt-0.5  bg-white mx-auto transition  duration-200 ease-in-out"
                : "w-10 pt-0.5  bg-white mx-auto -rotate-[39deg] translate-x- -translate-y-1.5 transition  duration-200 ease-in-out "
            }
          ></div>
        </div>
      </div>
      <div
        className={
          navOpen
            ? "absolute w-full h-screen top-20 left-0  z-20 transition duration-200 ease-in-out"
            : "hidden transition  duration-200 ease-in-out"
        }
      >
        <div className="bg-[#000000a1] w-full pt-10 h-5/6 flex flex-col items-center">
          <div
            className=" text-white my-2 uppercase text-xl p-2"
            onClick={() => setNavOpen(false)}
          >
            <Link href={"/"}> Home</Link>
          </div>
          <div
            className="text-white my-2 uppercase text-xl p-2"
            onClick={() => setNavOpen(false)}
          >
            <Link href={"/podcast"}> Podcast</Link>
          </div>
          <div
            className="text-white my-2 uppercase text-xl p-2"
            onClick={() => setNavOpen(false)}
          >
            <Link href={"/about"}> About Pizzes</Link>
          </div>
          <div
            className="text-white my-2  uppercase text-xl p-2"
            onClick={() => setNavOpen(false)}
          >
            Contact
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
