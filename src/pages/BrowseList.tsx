import { useEffect, useState } from "react";
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

import { Category,Song } from "@/interface/Interface";

const BrowseList = () => {
  const { id } = useParams();

  const [genres, setGenres] = useState<Category>();
  const [songs, setSongs] = useState<Song[]>([]);
  useEffect(() => {
    getGenres(id);
    getSongByGenres(id);
  }, [id]);

  const getGenres = async (id: string | undefined) => {
   
    try {
         await axios.request({
           url: `${import.meta.env.VITE_BASE_API}/api/genre/${id}`,
           method: "GET",
         }).then((res) => {
            setGenres(res.data.data)
            
         })

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
            setSongs(res.data.data);
            console.log(res.data.data);
          });
      } catch (error) {
        toast.error("Failed to get genres");
        console.log(error);
      }
    };
  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] w-[calc(100vw-250px)] text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col relative gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] h-[1000px] w-[100%] rounded-xl overflow-hidden">
        <div
          className="w-[100%] h-[270px] absolute top-0"
          style={{
            background: `linear-gradient(to bottom, ${genres?.bgColor}, #07070705)`,
          }}
        ></div>

        <div className="flex flex-col gap-2 z-10 py-4">
          <div className="flex gap-5 items-end py-6 px-6 border-b-2 border-[#1d1c1c]">
            <img
              src={genres?.image}
              alt=""
              className="w-[150px] h-[170px] rounded-lg shadow-2xl"
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-3xl">{genres?.genre}</h1>
              <p className="font-semibold text-lg text-teal-400">
                {genres?.des}
              </p>
            </div>
          </div>
        </div>

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
            {songs.map((song, index) => (
              <TableRow key={index}>
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
                <TableCell>{song.createdAt.slice(0,10)}</TableCell>
                <TableCell className="text-right">{song.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BrowseList;
