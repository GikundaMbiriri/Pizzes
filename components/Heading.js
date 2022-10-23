import React from "react";
import { BiCheckCircle } from "react-icons/bi";
function Heading() {
  return (
    <div className="w-full">
      <div className=" font-Henny text-center py-4 text-7xl text-[#DA64C6] ">
        Pizzes
      </div>
      <div className=" px-4 leading-relaxed">
        Pizzes is an inspirational and personal development content platform
        that is geared towards raising a generation with re-defined thinking
        patterns and transformed progressive mindsets. More than a website,
        Pizzes is your place of peace, closure and clarity. A place where truth
        and knowledge is dispensed, to enable people rise and become the very
        best version of themselves.
      </div>
      <div className="w-11/12 mx-auto mt-4">
        <div className=" md:flex md:justify-evenly  ">
          <div className="">
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Self-awareness and identity</div>
            </div>
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Intellectual growth</div>
            </div>
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Emotional intelligence</div>
            </div>
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Relationships</div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Spiritual growth</div>
            </div>
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Mental health</div>
            </div>
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Character and leadership</div>
            </div>
            <div className="flex items-center">
              <div className=" pr-2">
                <BiCheckCircle className=" text-pizzes-pink" />
              </div>
              <div className="">Wealth mindset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heading;
