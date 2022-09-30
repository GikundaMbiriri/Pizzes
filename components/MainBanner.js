import React from "react";
import Image from "next/image";
import home2 from "../assets/home2.jpeg";
import latest1 from "../assets/latest001.jpeg";
import latest2 from "../assets/latest002.jpeg";
import latest3 from "../assets/latest003.jpeg";
function MainBanner() {
  return (
    <div className=" w-full h-full relative shadow-lg">
      <div className="absolute top-0 w-full h-full ">
        <Image
          className="  object-cover animate-[fade_ease-in-out_8s_infinite_-6s] "
          src={home2}
          layout="fill"
        />
      </div>
      <div className="absolute top-0 w-full h-full ">
        <Image
          className=" object-cover animate-[fade_ease-in-out_8s_infinite_-4s]"
          src={latest1}
          layout="fill"
        />
      </div>
      <div className="absolute top-0 w-full h-full ">
        <Image
          className=" object-cover animate-[fade_ease-in-out_8s_infinite_-2s]"
          src={latest2}
          layout="fill"
        />
      </div>
      <div className="absolute top-0 w-full h-full ">
        <Image
          className=" object-cover animate-[fade_ease-in-out_8s_infinite_0s]"
          src={latest3}
          layout="fill"
        />
      </div>
    </div>
  );
}

export default MainBanner;
