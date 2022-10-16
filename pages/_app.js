import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import { MusicPlayer } from "../components/player/PodcastPlayer";
import { userStore } from "../store/index";
import Head from "next/head";
import Script from "next/script";
import TagManager from "react-gtm-module";
function MyApp({ Component, pageProps: { ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());
  const [windowWidth, setWindowWidth] = useState(800);
  const storeUser = userStore((state) => state.setUser);
  const authUser = userStore((state) => state.user);
  initializeApp({
    apiKey: "AIzaSyB9hkHd3zfuWEusStfxcFYgqbyNRwUFj08",
    authDomain: "pizzes-2f536.firebaseapp.com",
    projectId: "pizzes-2f536",
    storageBucket: "pizzes-2f536.appspot.com",
    messagingSenderId: "198402340183",
    appId: "1:198402340183:web:85022e26ec75c1dde07a12",
    measurementId: "G-YBJVWQDJ3B",
  });
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const id = user.uid;
        storeUser({ authenticated: true, id: id });
        localStorage.setItem("user", user.accessToken);
        console.log(authUser);
      } else {
        storeUser({ authenticated: false, id: "" });
        localStorage.removeItem("user");
      }
    });
  }, []);

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
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-PK6BDFR" });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head></Head>
        <div className="  w-screen h-screen flex flex-col overflow-y-scroll scrollbar-hide relative ">
          <div className=" h-30">
            {(windowWidth > 600 && <Navbar />) || <MobileNavbar />}
          </div>
          <Component {...pageProps} />
          <div className="fixed bottom-0 left-0 right-0 bg-white text-black">
            <MusicPlayer />
          </div>
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
