import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

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

import {  useContext, useEffect } from "react";
import { PlayerContext } from "@/Provider/PlayConext";

const Player = () => {
  const playerContext = useContext(PlayerContext);
  const { selectedSong, audioRef, isPlaying, playPauseClick } = playerContext;

  useEffect(() => {
    console.log(selectedSong);
  }, [selectedSong]);

  const handlePlayPause = () => {
    playPauseClick();
  };

  return (
    <div className="flex justify-between h-[80px] w-full bg-black px-10 text-white">
      <div className="flex gap-3 items-center w-[200px]">
        <img src={selectedSong?.image} alt="" className="h-[50px] w-[50px]" />
        <div>
          <h2 className="font-semibold">{selectedSong?.songName}</h2>
          <p className="text-[12px]">{selectedSong?.artist}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex gap-2 items-center justify-center">
          <SkipBack />
          <div
            key={selectedSong?.songId}
            onClick={handlePlayPause}
            className="h-[35px] w-[35px] bg-white rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Pause color="#000" strokeWidth={2} absoluteStrokeWidth />
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
                    <Play color="#000" strokeWidth={2} absoluteStrokeWidth />
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
          <SkipForward />
        </div>
        <div className="flex gap-4 items-center">
          <p>0:00</p>
          <Progress value={60} className="w-[450px] h-[7px]" />
          <p>{selectedSong?.duration}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-[200px]">
        <Volume2 />
        <Slider
          defaultValue={[33]}
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
