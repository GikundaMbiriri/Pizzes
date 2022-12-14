import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import home2 from "../../assets/home2.jpeg";
import {
  AiOutlineWhatsApp,
  AiFillTwitterCircle,
  AiOutlineMail,
  AiFillLinkedin,
  AiFillRedditCircle,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import {
  BsFacebook,
  BsLink45Deg,
  BsTelegram,
  BsChevronRight,
  BsChevronLeft,
} from "react-icons/bs";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  LineShareButton,
} from "next-share";
const SharingModal = ({ setShowShare, url, title, pic }) => {
  const [copyBtnText, setCopyBtnText] = useState("Copy");
  const [showForwardButton, setShowForwardButton] = useState(true);
  const lastElement = useRef();
  const firstElement = useRef();
  useEffect(() => {
    navigator.clipboard.readText().then((clipText) => {
      if (clipText != url) {
        setCopyBtnText("Copy");
      } else {
        setCopyBtnText("Copied");
      }
    });
  });

  const copyText = () => {
    navigator.clipboard.writeText(url);
    setCopyBtnText("Copied");
  };
  const handleForwardClick = () => {
    setShowForwardButton(false);
    lastElement.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleBackwardClick = () => {
    setShowForwardButton(true);
    firstElement.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        className="fixed w-full inset-0 z-100 overflow-hidden flex justify-center items-end md:items-center animated fadeIn faster"
        style={{ background: "rgba(0,0,0,.6)" }}
      >
        <div className="shadow-xl modal-container bg-black text-white w-full md:w-3/5 lg:w-3/5 xl:w-1/3 mx-auto rounded-t-lg md:rounded-lg z-100 overflow-y-auto max-h-full">
          <div className="modal-content text-left">
            <div className=" flex items-center justify-between px-4 py-2 w-full ">
              <div className=" text-lg text-white ">Share Content</div>
              <div
                className=" text-[#A841A3]  cursor-pointer"
                onClick={() => setShowShare(false)}
              >
                <MdOutlineCancel className="text-2xl" />
              </div>
            </div>
            <div className="px-4 flex items-center">
              <Image
                src={pic ? pic : home2}
                className=" rounded-lg"
                height={100}
                width={100}
                layout="intrinsic"
              />
              <div className="pl-4">
                <div className=" text-lg font-black line-clamp-1  text-white">
                  {title}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center space-x-2  px-4 py-4">
              <div
                className=" px-2 rounded-lg cursor-pointer flex flex-col items-center group hover:bg-gray-200"
                onClick={copyText}
              >
                <BsLink45Deg className=" text-[#A841A3] text-2xl" />
                <div className=" text-xs group-hover:text-black">Copy</div>
              </div>
              <WhatsappShareButton url={url} title={`Pizzes article: ${title}`}>
                <div className=" px-2 rounded-lg cursor-pointer flex flex-col items-center group hover:bg-gray-200">
                  <AiOutlineWhatsApp className=" text-[#A841A3]  text-2xl" />
                  <div className=" text-xs group-hover:text-black">
                    WhatsApp
                  </div>
                </div>
              </WhatsappShareButton>
              <TwitterShareButton url={url} title={`Pizzes article: ${title}`}>
                <div className=" px-2 rounded-lg cursor-pointer flex flex-col items-center group hover:bg-gray-200">
                  <AiFillTwitterCircle className=" text-[#A841A3] text-2xl" />
                  <div className=" text-xs group-hover:text-black">Twitter</div>
                </div>
              </TwitterShareButton>
              <FacebookShareButton url={url} quote={`Pizzes article: ${title}`}>
                <div className=" px-2 rounded-lg cursor-pointer flex flex-col items-center group hover:bg-gray-200">
                  <BsFacebook className=" text-[#A841A3] text-2xl" />
                  <div className=" text-xs group-hover:text-black">
                    Facebook
                  </div>
                </div>
              </FacebookShareButton>
              <EmailShareButton url={url} title={`Pizzes article: ${title}`}>
                <div className=" px-2 rounded-lg cursor-pointer flex flex-col items-center group hover:bg-gray-200">
                  <AiOutlineMail className=" text-[#A841A3] text-2xl" />
                  <div className=" text-xs group-hover:text-black">Email</div>
                </div>
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
SharingModal.defaultProps = {
  closeHandler: () => {},
  url: "https",
  content: "info",
};
export default SharingModal;
