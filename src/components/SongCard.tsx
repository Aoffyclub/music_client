import { Play, Pause } from "lucide-react";
import { useContext } from "react";
import { PlayerContext } from "@/Provider/PlayConext";
import { Song } from "@/interface/Interface";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// กำหนดประเภทของพร็อพที่ SongCard จะรับ
interface SongCardProps {
  data: Song;
}

const SongCard = ({ data }: SongCardProps) => {
  const playerContext = useContext(PlayerContext);

  
  if (!playerContext) {
    throw new Error("SongCard must be used within a PlayerProvider");
  }
  const { setSongToPlay, playClick, puaseClick, isPlaying, selectedSong } =
    playerContext;

  const hadlePlay = () => {
    setSongToPlay(data?.songId);
    playClick();
  };
  const handlePause = () => {
    puaseClick();
  };

  return (
    <div className="h-auto bg-black p-3 flex flex-col gap-2 rounded-xl hover:bg-[#00000070] shadow-md relative group">
      <div className="absolute top-[140px] right-6 h-[40px] w-[40px] flex items-center justify-center text-sm rounded-full bg-[#2B2A2A] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
        {isPlaying && selectedSong?.songId == data.songId ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pause onClick={handlePause} />
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
                <Play onClick={hadlePlay} />
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
      <img src={data?.image} alt="" className="rounded-md h-[180px] w-[100%]" />
      <p className="font-semibold">{data?.songName}</p>
      <p className="text-sm hover:underline text-[#8E8E8E]">{data?.artist}</p>
    </div>
  );
};

export default SongCard;
