import React from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactSocials from "../components/contact/ContactSocials";

import { NextSeo } from "next-seo";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function contact() {
  return (
    <>
      <NextSeo
        title={"Pizzes Blog and Podcast Contact Page"}
        description="This is a pizzes blog and podcast creation."
        canonical="https://pizzes.co.ke/contact"
        openGraph={{
          url: "https://pizzes.co.ke/contact",
          title: "Pizzes Blog and Podcast Contact Page",
          description: "This is a pizzes blog and podcast creation.",
          images: [
            {
              url: "./home2.jpeg",
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
      <div className=" md:flex  w-full  pb-20 bg-gradient-to-tl from-black to-pizzes-pink  ">
        <div className=" md:w-1/2 w-full md:p-10 p-4 text-white">
          <ContactSocials />
        </div>
        <div className=" md:w-1/2 w-full md:p-10 p-4">
          <ContactForm />
        </div>
      </div>

      <FloatingWhatsApp
        accountName={"Pizzes"}
        avatar={"/logo.svg"}
        phoneNumber="254758462107"
      />
    </>
  );
}

export default contact;
