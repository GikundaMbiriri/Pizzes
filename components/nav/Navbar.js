import React, { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import logo from "../../assets/logo.svg";
import Link from "next/link";
function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setDropDown(false));
  return (
    <>
      <div className="w-full bg-gradient-to-t  from-[#f3078998] to-[#00000090] shadow-xl px-2 py-4 flex justify-between items-baseline">
        <div className=" w-20 h-20  ">
          <img src={"/logo.svg"} alt="" className=" w-20 h-20 object-cover " />
        </div>
        <div className="flex mr-10    text-white">
          <div className=" px-4 cursor-pointer rounded-full hover:bg-white hover:text-gray-500">
            <Link href={"/"}> Home</Link>
          </div>
          <div className="px-4 cursor-pointer rounded-full hover:bg-white hover:text-gray-500">
            <Link href={"/podcast"}> Podcast</Link>
          </div>

          <div
            ref={ref}
            className=" px-4  flex relative items-center  cursor-pointer rounded-full hover:bg-white hover:text-gray-500"
          >
            <Link href={"/about"}> About Pizzes</Link>
          </div>
          <div className="px-4 cursor-pointer rounded-full hover:bg-white hover:text-gray-500">
            <Link href={"/contact"}> Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
}
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
export default Navbar;
