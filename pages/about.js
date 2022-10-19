import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import home2 from "../assets/home2.jpeg";
import { BiCheckCircle } from "react-icons/bi";

function About() {
  return (
    <>
      <NextSeo
        title={"About Pizzes Blog and Podcast"}
        description="This is a pizzes blog and podcast creation."
        canonical="https://pizzes.co.ke/about"
        openGraph={{
          url: "https://pizzes.co.ke/about",
          title: "About Pizzes Blog and Podcast",
          description: "This is a pizzes blog and podcast creation.",
          images: [
            {
              url: home2,
              width: 800,
              height: 600,
              alt: "Pizzes",
              type: "image/jpeg",
            },
          ],
          site_name: "Pizzes Blog and Podcast",
        }}
        twitter={{
          handle: "@MissKanyasya",
          site: "@MissKanyasya",
          cardType: "summary_large_image",
        }}
      />
      <Head>About Pizzes</Head>
      <div className=" w-11/12 mx-auto pb-20">
        <div className=" pt-4 font-black text-xl">ABOUT PIZZES</div>
        <div className=" italic py-5">Re-define. Renew. Transform</div>
        <div className="">A warm welcome to the Pizzes page! </div>
        <p className="">
          Pizzes is a Personal development and inspirational content page, and
          platform that is geared towards raising a generation with re-defined
          thinking patterns and transformed progressive mindsets. More than a
          website, Pizzes is your place of peace, closure and clarity. A place
          where truth and knowledge is dispensed, to enable people rise and
          become the very best version of themselves.
        </p>
        <div className=" font-semibold py-2 text-[#DA64C6]">
          Content line up:
        </div>
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
        <p className=" py-2">
          Pizzes is a word I formed, from the word Pizzicato, which is a musical
          term that describes the playing of a stringed instrument through
          plucking by hand, mostly the Harp. The playing of the harp is
          therapeutic and has a calming and healing effect, which is the same
          effect I hope will be experienced and felt by every individual that
          comes into contact with the words on this blog page.
        </p>
        <p className=" py-2">
          Here at Pizzes, we will be opened up to re-definition of our thinking
          patterns, the renewal of our mindsets through knowledge that will give
          us the strength we need to break out of the levels that we have
          stagnated in. It merely enough, to simply keep talking about how
          messed up things have become. We need to take a step, and begin to
          gain intellectual, mental, social and spiritual, knowledge, wisdom
          insight, and may the power that works through these truths, bring us
          to a point of progression, healing of our hearts and minds, and
          transformation into our very best selves.
        </p>
        <p className="py-2">
          For my listening audience, I gatchyu! I will keep uploading audio or
          podcast versions of my written content just for you!
        </p>
      </div>
    </>
  );
}

export default About;
