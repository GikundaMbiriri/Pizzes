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
import { MdOutlineCancel } from 'react-icons/md'
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
} from "react-share";
const SharingModal = ({ setShowShare, url, title }) => {
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
        <div className=" absolute  z-50 bg-white w-80 shadow-lg rounded-lg">
            <div className=" flex items-center justify-between px-4 py-2 w-full ">

                <div className=" text-lg text-red-200 ">Share Article</div>
                <div className=" text-[#A841A3]  cursor-pointer" onClick={() => setShowShare(false)}><MdOutlineCancel /></div>

            </div>
            <div className="px-4 flex items-baseline">
                <Image src={home2} className=" rounded-lg" height={70} width={70} layout="intrinsic" />
                <div className=" text-lg font-black line-clamp-1 pl-4 text-green-200">
                    {title}
                </div>
            </div>

            <div className="flex px-4 py-4">

                <div className=" px-2 rounded-full    cursor-pointer hover:bg-gray-200" onClick={copyText}>
                    < BsLink45Deg className=" text-green-500 text-2xl" />
                </div>
                <WhatsappShareButton url={url}>
                    <div className=" px-2  cursor-pointer">
                        <AiOutlineWhatsApp className=" text-[#A841A3]  text-2xl" />
                    </div>
                </WhatsappShareButton>
                <TwitterShareButton url={url}>
                    <div className=" px-2  cursor-pointer">
                        <AiFillTwitterCircle className=" text-[#30D74C] text-2xl" />
                    </div>
                </TwitterShareButton>
                <FacebookShareButton url={url}>
                    <div className=" px-2  cursor-pointer">
                        < BsFacebook className=" text-[#30D74C] text-2xl" />
                    </div>
                </FacebookShareButton>
                <EmailShareButton url={url}>
                    <div className=" px-2  cursor-pointer">
                        < AiOutlineMail className=" text-[#30D74C] text-2xl" />
                    </div>
                </EmailShareButton>
            </div>
        </div>
    );
};
SharingModal.defaultProps = {
    closeHandler: () => { },
    url: "https",
    content: "info",
};
export default SharingModal;
