import { Play, Pause } from "lucide-react";
import { useState } from "react";
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
}

const SongCard = ({ image, songName, artists }: Song) => {
  const [play, setPlay] = useState<boolean>(false);

  const handlePlay = () => {
    setPlay((prev) => !prev);
    toast.success("Playing: " + songName);
  };
  return (
    <div className="h-auto bg-black p-3 flex flex-col gap-2 rounded-xl hover:bg-[#00000070] shadow-md relative group">
      <div
        onClick={handlePlay}
        className="absolute top-[140px] right-6 p-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 "
      >
        {play ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pause />
              </TooltipTrigger>
              <TooltipContent className="bg-[#312e2e] border-none p-1">
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
              <TooltipContent className="bg-[#312e2e] border-none p-1">
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
    </div>
  );
};

export default SongCard;
