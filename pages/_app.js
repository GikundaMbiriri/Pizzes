import "../styles/globals.css";
import React, { useState, useEffect } from "react";

//import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
function MyApp({ Component, pageProps: { ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());
  const [windowWidth, setWindowWidth] = useState(800);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
      console.log(windowWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className="  w-screen h-screen flex flex-col overflow-y-scroll scrollbar-hide relative ">
          <div className=" h-30">
            {(windowWidth > 600 && <Navbar />) || <MobileNavbar />}
          </div>
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
