import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Headset from "../images/headset.png"

import {
  SkipForward,
  SkipBack,
  Play,
  Pause,
  Volume2,
  Maximize2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useContext } from "react";
import { PlayerContext } from "@/Provider/PlayConext";

const Player = () => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    throw new Error("SongCard must be used within a PlayerProvider");
  }
  const {
    selectedSong,
    playClick,
    puaseClick,
    audioRef,
    currentTime,
    isPlaying,
    endTime,
    seekbar,
    nextSong,
    prevSong,
  } = playerContext;



  const changeValume = (value : number[]) => {
     if (audioRef?.current) {
       audioRef.current.volume = value[0] /100;
     }
    
  };

  return (
    <div className="flex justify-between h-[80px] w-full bg-black md:px-10 px-4 text-white">
      <div className="flex gap-3 items-center md:w-[200px] w-auto">
        <img
          src={selectedSong?.image || Headset}
          alt=""
          className="h-[50px] w-[50px] rounded-md bg-[#1B1A1A]"
        />
        <div>
          <h2 className="font-semibold line-clamp-1">
            {selectedSong?.songName}
          </h2>
          <p className="text-[12px] line-clamp-1">{selectedSong?.artist}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex gap-2 items-center justify-center">
          <SkipBack onClick={() => prevSong()} />
          <div
            key={selectedSong?.songId}
            // onClick={handlePlayPause}
            className="h-[35px] w-[35px] bg-white rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Pause
                      onClick={() => puaseClick()}
                      color="#000"
                      strokeWidth={2}
                      absoluteStrokeWidth
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#312e2e] border-none p-1">
                    <p className="text-[12px] font-semibold text-white">
                      Pause this song
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Play
                      onClick={() => playClick()}
                      color="#000"
                      strokeWidth={2}
                      absoluteStrokeWidth
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#312e2e] border-none p-1">
                    <p className="text-[12px] font-semibold text-white">
                      Play this song
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <SkipForward onClick={() => nextSong()} />
        </div>
        <div className="sm:flex hidden gap-4 items-center">
          <p>
            {currentTime?.minute}:{currentTime?.second}
          </p>
          <Progress
            value={seekbar}
            className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[400px]  h-[7px]"
          />
          <p>
            {isNaN(endTime.minute)
              ? "00"
              : String(endTime.minute).padStart(2, "0")}
            :
            {isNaN(endTime.second)
              ? "00"
              : String(endTime.second).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="sm:flex hidden items-center gap-2 md:w-[200px] w-[100px]">
        <Volume2 />
        <Slider
          onValueChange={changeValume}
          defaultValue={[100]}
          max={100}
          step={1}
          className="w-[150px] h-[7px]"
        />
        <Maximize2 size={18} className="ml-2" />
      </div>
      <audio ref={audioRef} src={selectedSong?.audio} />
    </div>
  );
};

export default Player;
