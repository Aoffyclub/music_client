import Genre from "@/components/Genre";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "@/interface/Interface";

const Browse = () => {
  const [genres, setGenres] = useState<Category[]>([]);
  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    try {
      await axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/genre",
          method: "GET",
          // headers: {
          //   Authorization: "Bearer",
          // },
        })
        .then((res) => {
          setGenres(res.data.data);
          // toast.success(res.data.message);
        });
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] md:w-[calc(100vw-250px)] w-full text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] rounded-xl py-4 px-6">
        <h1 className="text-3xl font-bold">Music browse!</h1>
        <p className="text-lg">
          Discover new songs, artists, and albums that you like.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-8">
          {genres.map((data) => (
            <Genre
              key={data.genreId}
              id={data.genreId}
              image={data.image}
              genre={data.genre}
              des={data.des}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
