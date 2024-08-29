import SongCard from "@/components/SongCard";
import { Song } from "@/interface/Interface";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


type SongCard = {
  id: number;
  image: string;
  songName: string;
  artists: string;
};

const Newsong = () => {
  const [allSong, setAllSong] = useState<Song []>([])
  const newSongs: SongCard[] = [
    { id: 1, image: "image1.jpg", songName: "Song One", artists: "Artist A" },
    { id: 2, image: "image2.jpg", songName: "Song Two", artists: "Artist B" },
    {
      id: 3,
      image: "image3.jpg",
      songName: "Song Three",
      artists: "Artist C",
    },
    { id: 4, image: "image4.jpg", songName: "Song Four", artists: "Artist D" },
    { id: 5, image: "image5.jpg", songName: "Song Five", artists: "Artist E" },
    { id: 6, image: "image6.jpg", songName: "Song Six", artists: "Artist F" },
  ];

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
           console.log(res.data.data);
           setAllSong(res.data.data);
         });
     } catch (err) {
       toast.error("Failed to get genre list");
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
          {allSong?.map((data) => (
            <SongCard
              key={data.songId}
              image={data.image}
              songName={data.songName}
              artists={data.artist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsong;
