import { useRef, useEffect, useState } from "react";

import {
  BiPlay,
  BiPause,
  BiSkipPrevious,
  BiSkipNext,
  BiShuffle,
  BiRepost,
  BiListUl,
  BiVolumeFull,
} from "react-icons/bi";
import { usePlayer } from "../../store/index";

const mode = {
  light: {
    text: "text-bloow-black",
    background: "bg-white",
    navLink: "text-black",
    navText: "text-bloow-blue",
  },
  dark: {
    text: "text-white",
    background: "bg-bloow-blue",
    navLink: "text-black",
    navText: "text-white",
  },
};
export const WavePlayer = ({ url, togglePlay }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const options = waveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      if (togglePlay) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    return () => wavesurfer.current.destroy();
  }, [url, togglePlay]);

  return <div ref={waveformRef}></div>;
};

export const MusicPlayer = () => {
  const isPlaying = usePlayer((state) => state.isPlaying);
  const setIsPlaying = usePlayer((state) => state.setIsPlaying);
  const currentlyPlaying = usePlayer((state) => state.currentlyPlaying);
  const setCurrentlyPlaying = usePlayer((state) => state.setCurrentlyPlaying);

  const [percentage, setPercentage] = useState(0);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [volumePercentage, setVolumePercentage] = useState(10);

  const audioRef = useRef();
  const volumeRangeRef = useRef();

  // useEffect(() => {
  //   console.log("Runs while mounting");

  //   return () => {
  //     setIsPlaying(false);
  //   };
  // }, []);

  useEffect(() => {
    const storedContent = window.localStorage.getItem("content");
    if (storedContent) {
      setCurrentlyPlaying(JSON.parse(storedContent));
    }
  }, []);

  useEffect(() => {
    if (currentlyPlaying) {
      console.log("artist Playlist", currentlyPlaying);

      window.localStorage.setItem("content", JSON.stringify(currentlyPlaying));
    }
  }, [currentlyPlaying]);

  useEffect(() => {
    if (currentTime === duration && currentlyPlaying && isPlaying) {
      setTimeout(() => {
        playNext();
      }, 1500);
    }
  }, [currentTime, duration]);

  useEffect(() => {
    if (currentlyPlaying && isPlaying) {
      const audio = audioRef.current;
      audio.load();
      audio.volume = volume;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            setIsPlaying(true);
          })
          .catch((err) => {
            setIsPlaying(false);
          });
      }
    }
  }, [currentlyPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    console.dir(audio);
    console.log(currentlyPlaying.filepath);
    if (!isPlaying && currentlyPlaying) {
      audio.pause();
      return;
    }
    if (isPlaying && currentlyPlaying) {
      audio.play();
      return;
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const onChangeVolume = (e) => {
    setVolume(parseFloat(e.target.value));
    setVolumePercentage(e.target.value * 100);
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(percent);
    setCurrentTime(time.toFixed(2));
  };

  const playNext = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
  };

  const playPrevious = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
  };

  return (
    <div
      className={`${
        currentlyPlaying ? "block" : "hidden"
      } w-full flex justify-between items-center`}
    >
      <div className="w-full md:w-1/4 flex px-2 gap-x-2">
        <div className="w-12 h-12">
          <img
            src={currentlyPlaying?.image}
            className="rounded-md w-full h-full object-cover"
          />
        </div>
        <div className={`flex flex-col justify-center    ${mode.light.text}`}>
          <div className="text-sm cursor-pointer hover:underline line-clamp-1">
            {currentlyPlaying?.name}
          </div>
          <div className="text-xs cursor-pointer hover:underline text-gray-600 line-clamp-1">
            Pizzes
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <ControlPlanel
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          playNext={playNext}
          playPrevious={playPrevious}
        />
        <Slider
          percentage={percentage}
          onChange={onChange}
          duration={duration}
          currentTime={currentTime}
        />
        <audio
          ref={audioRef}
          onTimeUpdate={getCurrDuration}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration.toFixed(2));
          }}
          src={currentlyPlaying?.filepath}
        ></audio>
      </div>
      <div className="w-1/4 hidden md:flex justify-end gap-x-2 items-center px-4">
        <div className="hover:bg-gray-200 p-2 rounded-full transition-all cursor-pointer">
          <BiListUl size={20} className={`${mode.light.text}`} />
        </div>
        <div>
          <BiVolumeFull size={18} className={`${mode.light.text}`} />
        </div>
        <div className="w-32 relative flex items-center">
          <div className="absolute w-full h-1 bg-gray-200"></div>
          <div
            className="absolute h-1 bg-gradient-to-r from-green to-bloow-blue rounded-full"
            style={{ width: `${volumePercentage}%` }}
          ></div>
          <div
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green to-bloow-blue transition-all"
            style={{ left: `${volumePercentage}%` }}
          ></div>
          <input
            type="range"
            value={volume}
            ref={volumeRangeRef}
            step="0.01"
            min="0"
            max="1"
            className="range"
            onChange={onChangeVolume}
          />
        </div>
      </div>
    </div>
  );
};

function Slider({ percentage = 0, onChange, duration, currentTime }) {
  const [position, setPosition] = useState(0);

  const rangeRef = useRef();

  useEffect(() => {}, [percentage]);

  function secondsToHms(seconds) {
    if (!seconds) return "00:00";

    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % 3600;

    let min = parseInt(duration / 60);
    duration = duration % 60;

    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
    } else if (min == 0) {
      return `00:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  }

  return (
    <div className="w-full hidden md:flex gap-x-2 items-center">
      <div className={`${mode.light.text} text-xs`}>
        {secondsToHms(currentTime)}
      </div>
      <div className=" relative w-full h-1 bg-gray-200 rounded-full">
        <div
          className="absolute bg-gradient-to-r from-green to-bloow-blue w-1/2 h-full rounded-full cursor-pointer transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
        <div
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green to-bloow-blue -top-1 transition-all"
          style={{ left: `${percentage}%` }}
        ></div>
        <div className="absolute w-full -top-1.5">
          <input
            type="range"
            value={position}
            ref={rangeRef}
            step="0.01"
            className="range"
            onChange={onChange}
          />
        </div>
      </div>
      <div className={`${mode.light.text} text-xs`}>
        {secondsToHms(duration)}
      </div>
    </div>
  );
}

const ControlPlanel = ({ setIsPlaying, isPlaying, playNext, playPrevious }) => {
  return (
    <div className="flex gap-x-4 items-center">
      <div
        className={`${"hover:bg-gray-200"} rounded-full p-1.5 cursor-pointer`}
      >
        <BiShuffle
          size={20}
          className={`${mode.light.text} cursor-pointer hover:bg-gray-200 rounded-full`}
        />
      </div>
      <BiSkipPrevious
        size={35}
        className={`${mode.light.text} cursor-pointer hover:bg-gray-200 rounded-full`}
        onClick={playPrevious}
      />
      <Button play={setIsPlaying} isPlaying={isPlaying} />
      <BiSkipNext
        size={35}
        className={`${mode.light.text} cursor-pointer hover:bg-gray-200 rounded-full`}
        onClick={playNext}
      />
      <div
        className={`${"hover:bg-gray-200"} rounded-full p-1.5 cursor-pointer hidden md:block`}
      >
        <BiRepost size={23} className={`${mode.light.text}`} />
      </div>
    </div>
  );
};

function Button({ isPlaying, play }) {
  useEffect(() => {
    document.addEventListener("keyup", enterPlayPause);
  }, []);

  const enterPlayPause = (e) => {
    if (e.keyCode === 32) {
      play((prevState) => !prevState);
    }
  };

  return (
    <div className="">
      {(!isPlaying && (
        <BiPlay
          size={35}
          className={`${mode.light.text} cursor-pointer `}
          onClick={() => play(!isPlaying)}
          onKeyUp={enterPlayPause}
        />
      )) || (
        <BiPause
          size={35}
          className={`${mode.light.text} cursor-pointer`}
          onClick={() => play(!isPlaying)}
          onKeyUp={enterPlayPause}
        />
      )}
    </div>
  );
}
