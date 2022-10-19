import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaPodcast } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
function Footer() {
  const [navigation, setNavigation] = useState();
  const router = useRouter();

  useEffect(() => {
    if (/^\/article\b[\/\w|\d]*/g.test(router.pathname)) {
      setNavigation("article");
    } else if (/^\/podcast\b[\/\w|\d]*/g.test(router.pathname)) {
      setNavigation("podcast");
    } else if (/^\/about\b[\/\w|\d]*/g.test(router.pathname)) {
      setNavigation("about");
    } else {
      setNavigation("article");
    }
  }, [router.pathname]);
  const selected = " flex flex-col items-center text-pizzes-pink";
  const notSelected = " flex flex-col items-center";
  return (
    <div className=" flex justify-between w-full px-5 pt-0.5 shadow-xl border-t">
      <Link href={"/"}>
        <div className={navigation == "article" ? selected : notSelected}>
          <div className="">
            <AiFillHome className=" text-xl" />
          </div>
          <div className="">Home</div>
        </div>
      </Link>
      <Link href={"/podcast"}>
        <div className={navigation == "podcast" ? selected : notSelected}>
          <div className="">
            <FaPodcast className=" text-xl" />
          </div>
          <div className="">Podcast</div>
        </div>
      </Link>
      <Link href={"/about"}>
        <div className={navigation == "about" ? selected : notSelected}>
          <div className="">
            <MdReadMore className="text-2xl" />
          </div>
          <div className="">About</div>
        </div>
      </Link>
    </div>
  );
}

export default Footer;
