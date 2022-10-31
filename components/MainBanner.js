import React from "react";
import Image from "next/image";
import home2 from "../assets/home2.jpeg";
import latest1 from "../assets/latest001.jpeg";
import latest2 from "../assets/latest002.jpeg";
import reEdit1 from "../assets/re-edit1.jpg";
import reEdit2 from "../assets/re-edit2.jpg";
function MainBanner() {
  return (
    <div className=" w-full h-full relative shadow-lg">
      <div className="absolute top-0 w-full h-full ">
        <Image
          className="  object-cover  animate-[fade_ease-in-out_16s_infinite_0s] "
          src={reEdit1}
          layout="fill"
        />
      </div>
      <div className="absolute top-0 w-full h-full ">
        <Image
          className=" object-cover animate-[fade_ease-in-out_16s_infinite_-8s]"
          src={latest1}
          layout="fill"
        />
      </div>
      <div className="absolute top-0 w-full h-full ">
        <Image
          className=" object-cover animate-[fade_ease-in-out_16s_infinite_-12s]"
          src={latest2}
          layout="fill"
        />
      </div>
      <div className="absolute top-0 w-full h-full ">
        <Image
          className=" object-cover  animate-[fade_ease-in-out_16s_infinite_-4s]"
          src={reEdit2}
          layout="fill"
        />
      </div>
    </div>
  );
}

export default MainBanner;
