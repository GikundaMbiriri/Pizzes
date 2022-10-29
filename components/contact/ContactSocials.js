import React from "react";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";

export default function ContactSocials() {
  return (
    <div className="">
      <div className="  text-pizzes-pink font-Newsreader text-lg font-semibold">
        Get in Touch:--{`>`}
      </div>
      <div className=" text-lg py-1 font-Newsreader">Contact us</div>
      <div className=" ">
        For any questions about content,service providers or any other
        inquiries,Reach out to us via:
      </div>
      <div className=" flex space-x-8 items-center pt-4">
        <a href="https://twitter.com/MissKanyasya?s=08">
          <div className=" text-3xl p-2 cursor-pointer">
            <AiFillTwitterCircle className=" text-[#32A4F1]" />
          </div>
        </a>
        <a href="https://api.whatsapp.com/send/?phone=254758462107">
          <div className=" text-2xl p-2 cursor-pointer">
            <BsWhatsapp className="text-[#1D9C12]" />
          </div>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100064840879936">
          <div className=" text-2xl p-2 cursor-pointer">
            <BsFacebook className="text-[#1877F2]" />
          </div>
        </a>
        <a href="https://instagram.com/pizzes._?utm_medium=copy_link">
          <div className=" text-3xl p-2 cursor-pointer">
            <AiFillInstagram className="text-[#F64504]" />
          </div>
        </a>
      </div>
    </div>
  );
}
