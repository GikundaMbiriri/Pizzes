import React from "react";
import Image from "next/image";
import home2 from "../../assets/home2.jpeg";

function ArticleHead({ image, topic }) {
  return (
    <div className=" w-full  h-80 relative">
      <Image
        src={image}
        className="  object-cover  "
        layout="fill"
        placeholder="blur"
        blurDataURL={home2}
      />
      <div className=" absolute inset-0 w-full h-full bg-gradient-to-r from-[#9205478a] to-[#da7fad98]">
        <div className=" flex flex-col items-center justify-center ">
          <div className=" text-white pt-4  font-black text-4xl">{topic}</div>
        </div>
      </div>
    </div>
  );
}

export default ArticleHead;
