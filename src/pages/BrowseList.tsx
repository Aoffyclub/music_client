import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Category, Song } from "@/interface/Interface";
import { PlayerContext } from "@/Provider/PlayConext";

const BrowseList = () => {
  const { id } = useParams();

  const [genres, setGenres] = useState<Category>();

  const playerContext = useContext(PlayerContext);
  if (!playerContext) {
    throw new Error("Newsong must be used within a PlayerProvider");
  }
  const { allSongs, collectAllSongs, setSongToPlay, playClick } = playerContext;

  useEffect(() => {
    getGenres(id);
    getSongByGenres(id);
  }, [id]);

  const getGenres = async (id: string | undefined) => {
    try {
      await axios
        .request({
          url: `${import.meta.env.VITE_BASE_API}/api/genre/${id}`,
          method: "GET",
        })
        .then((res) => {
          setGenres(res.data.data);
        });
    } catch (error) {
      toast.error("Failed to get genres");
      console.log(error);
    }
  };

  const getSongByGenres = async (id: string | undefined) => {
    try {
      await axios
        .request({
          url: `${import.meta.env.VITE_BASE_API}/api/songgenres/${id}`,
          method: "GET",
        })
        .then((res) => {
          collectAllSongs(res.data.data);
        });
    } catch (error) {
      toast.error("Failed to get genres");
      console.log(error);
    }
  };

  const hadlePlay = (songId: number) => {
    setSongToPlay(songId);
    playClick();
  };
  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] md:w-[calc(100vw-250px)] w-full text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col relative gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] h-[1000px] w-[100%] rounded-xl overflow-hidden">
        <div
          className="w-[100%] sm:h-[270px] h-[180px] absolute top-0"
          style={{
            background: `linear-gradient(to bottom, ${genres?.bgColor}, #07070705)`,
          }}
        ></div>
        <div className="flex flex-col gap-2 z-10 sm:py-4 py-2">
          <div className="flex gap-5 items-end sm:py-6 py-4 px-6 border-b-[1px] border-[#1d1c1c]">
            <img
              src={genres?.image}
              alt=""
              className="sm:w-[150px] sm:h-[170px] w-[90px] h-[90px] rounded-lg shadow-2xl"
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-3xl">{genres?.genre}</h1>
              <p className="font-semibold text-lg text-teal-400">
                {genres?.des}
              </p>
            </div>
          </div>
        </div>
        {allSongs.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Create</TableHead>
                <TableHead className="text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSongs.map((song: Song, index: number) => (
                <TableRow
                  onClick={() => hadlePlay(song.songId)}
                  key={index}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={song.image}
                      alt=""
                      className="h-[50px] w-[50px] rounded-md shadow-sm"
                    />
                  </TableCell>
                  <TableCell>{song.songName}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">{song.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-[100%] mt-3 flex items-center justify-center text-[#726c6c] font-semibold text-lg">
            No song available
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseList;
