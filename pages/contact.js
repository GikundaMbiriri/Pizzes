import React from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactSocials from "../components/contact/ContactSocials";
import CompanyIcon from "../public/logo.svg";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import "react-whatsapp-widget/dist/index.css";
function contact() {
  return (
    <>
      <div className=" md:flex  w-full  pb-20 ">
        <div className=" md:w-1/2 w-full md:p-10 p-4">
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
