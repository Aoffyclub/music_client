import SongCard from "@/components/SongCard";
import axios from "axios";
import { useEffect, useContext } from "react";
import toast from "react-hot-toast";

import { PlayerContext } from "@/Provider/PlayConext";
import { Song } from "@/interface/Interface";

const Newsong = () => {
  const playerContext = useContext(PlayerContext);
  if (!playerContext) {
    throw new Error("Newsong must be used within a PlayerProvider");
  }
  const { allSongs, collectAllSongs } = playerContext;

  useEffect(() => {
    getSongList();
  }, []);

  const getSongList = () => {
    try {
      axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/song",
          method: "GET",
        })
        .then((res) => {
          collectAllSongs(res.data.data);
        });
    } catch (err) {
      toast.error("Failed to get genre list" + err.message);
    }
  };
  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] w-[calc(100vw-250px)] text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] h-[1000px] rounded-xl py-4 px-6">
        <h1 className="text-3xl font-bold">Music new release!</h1>
        <p className="text-lg">
          Discover new songs, artists, and albums update here.
        </p>

        <p className="text-xl font-bold mt-5">New songs release </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 ">
          {allSongs?.map((data: Song) => (
            <SongCard key={data.songId} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsong;
