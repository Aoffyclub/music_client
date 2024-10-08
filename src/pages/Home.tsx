import SongCard from "@/components/SongCard";
import Genre from "@/components/Genre";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlayerContext } from "@/Provider/PlayConext";

import { Song } from "@/interface/Interface";
import toast from "react-hot-toast";

type SongList = {
  id: number;
  image: string;
  genre: string;
  des: string;
};

const Home = () => {
  const [newSong, setNewSong] = useState<Song[]>([]);
  const [randomSong, setRandomSong] = useState<Song[]>([]);
  const [sliders, setSliders] = useState<number>(1);
  const playerContext = useContext(PlayerContext);
  if (!playerContext) {
    throw new Error("Newsong must be used within a PlayerProvider");
  }
  const { clearAllSongs, collectAllSongsHome } = playerContext;

  useEffect(() => {
    clearAllSongs();
    getNewSong();
    getRandomSong();
  }, []);

  const getNewSong = async () => {
    try {
      axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/songnew",
          method: "GET",
        })
        .then((res) => {
          setNewSong(res.data.data);
          collectAllSongsHome(res.data.data);
        });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error("Failed to get song list: " + errorMessage);
    }
  };

  const getRandomSong = async () => {
    try {
      axios
        .request({
          url: import.meta.env.VITE_BASE_API + "/api/song/random",
          method: "GET",
        })
        .then((res) => {
          setRandomSong(res.data.data);
          collectAllSongsHome(res.data.data);
        });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error("Failed to get random song list: " + errorMessage);
    }
  };

  const playList: SongList[] = [
    {
      id: 13,
      image: "image7.jpg",
      genre: "Song Hits",
      des: "Artist Superstar",
    },
    {
      id: 14,
      image: "image7.jpg",
      genre: "Song Hits2",
      des: "Artist Superstar2",
    },
    {
      id: 15,
      image: "image7.jpg",
      genre: "Song Hits3",
      des: "Artist Superstar3",
    },
    {
      id: 16,
      image: "image7.jpg",
      genre: "Song Hits4",
      des: "Artist Superstar4",
    },
    {
      id: 17,
      image: "image7.jpg",
      genre: "Song Hits5",
      des: "Artist Superstar5",
    },
    {
      id: 18,
      image: "image7.jpg",
      genre: "Song Hits6",
      des: "Artist Superstar6",
    },
    {
      id: 19,
      image: "image7.jpg",
      genre: "Song Hits7",
      des: "Artist Superstar7",
    },
  ];

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width: number = window.innerWidth;
      if (width >= 1700) {
        setSliders(6);
      } else if (width >= 1280) {
        setSliders(5); // xl
      } else if (width >= 1024) {
        setSliders(4); // lg
      } else if (width >= 768) {
        setSliders(3); // md
      } else if (width >= 640) {
        setSliders(2); // sm
      } else {
        setSliders(2); // xs
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] md:w-[calc(100vw-250px)] w-full text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] h-auto rounded-xl md:py-4 py-2 md:px-6 px-3">
        <h1 className="text-3xl font-bold">Welcome to Music !</h1>
        <p className="text-lg">
          Discover new songs, artists, and albums to add to your playlist.
        </p>

        <p className="text-xl font-bold mt-5">New songs release </p>
        <div>
          <Swiper
            slidesPerView={sliders}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {newSong.map((data: Song) => (
              <SwiperSlide key={data.songId}>
                <SongCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="text-xl font-bold mt-5">Random songs</p>
        <div>
          <Swiper
            slidesPerView={sliders}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {randomSong.map((data: Song) => (
              <SwiperSlide key={data.songId}>
                <SongCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="text-xl font-bold">Listing songs </p>
        <div>
          <Swiper
            slidesPerView={sliders}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {playList.map((data) => (
              <SwiperSlide key={data.id}>
                <Genre
                  id={data.id}
                  image={data.image}
                  genre={data.genre}
                  des={data.des}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
