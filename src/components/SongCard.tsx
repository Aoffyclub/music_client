import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Song {
  image: string;
  songName: string;
  artists: string;
  audio: string;
}

const SongCard = ({ image, songName, artists, audio }: Song) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        toast.error("Paused: " + songName);
      } else {
        audioRef.current.play();
        toast.success("Playing: " + songName);
      }
      setIsPlaying((prev) => !prev);
    }
  };
  return (
    <div className="h-auto bg-black p-3 flex flex-col gap-2 rounded-xl hover:bg-[#00000070] shadow-md relative group">
      <div
        onClick={handlePlayPause}
        className="absolute top-[140px] right-6 h-[40px] w-[40px] flex items-center justify-center text-sm rounded-full bg-[#2B2A2A] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 "
      >
        {isPlaying ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pause />
              </TooltipTrigger>
              <TooltipContent className="bg-[#242121] border-none">
                <p className="text-[10px] font-semibold text-white">
                  Pause this song
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Play />
              </TooltipTrigger>
              <TooltipContent className="bg-[#242121] border-none">
                <p className="text-[10px] font-semibold text-white">
                  Play this song
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <img src={image} alt="" className="rounded-md h-[180px] w-[100%]" />
      <p className="font-semibold">{songName}</p>
      <p className="text-sm hover:underline text-[#8E8E8E]">{artists}</p>
      <audio ref={audioRef} src={audio} />
    </div>
  );
};

export default SongCard;
