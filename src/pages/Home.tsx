import SongCard from "@/components/SongCard";
import Genre from "@/components/Genre";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";

type SongCard = {
  id: number;
  image: string;
  songName: string;
  artists: string;
};

type SongList = {
  id: number;
  image: string,
  genre: string;
  des: string
}

const Home = () => {
  const [sliders, setSliders] = useState<number>(1);
  const newSongs: SongCard[] = [
    { id: 1, image: "image1.jpg", songName: "Song One", artists: "Artist A" },
    { id: 2, image: "image2.jpg", songName: "Song Two", artists: "Artist B" },
    { id: 3, image: "image3.jpg", songName: "Song Three", artists: "Artist C" },
    { id: 4, image: "image4.jpg", songName: "Song Four", artists: "Artist D" },
    { id: 5, image: "image5.jpg", songName: "Song Five", artists: "Artist E" },
    { id: 6, image: "image6.jpg", songName: "Song Six", artists: "Artist F" },
  ];
  const trendSongs: SongCard[] = [
    { id: 7, image: "image7.jpg", songName: "Song Seven", artists: "Artist G" },
    { id: 8, image: "image8.jpg", songName: "Song Eight", artists: "Artist H" },
    { id: 9, image: "image9.jpg", songName: "Song Nine", artists: "Artist I" },
    { id: 10, image: "image10.jpg", songName: "Song Ten", artists: "Artist J" },
    {
      id: 11,
      image: "image11.jpg",
      songName: "Song Eleven",
      artists: "Artist K",
    },
    {
      id: 12,
      image: "image12.jpg",
      songName: "Song Twelve",
      artists: "Artist L",
    },
  ];

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
        setSliders(1); // xs
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] w-[calc(100vw-250px)] text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] h-[1000px] rounded-xl py-4 px-6">
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
            {newSongs.map((data) => (
              <SwiperSlide>
                <SongCard
                  key={data.id}
                  image={data.image}
                  songName={data.songName}
                  artists={data.artists}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="text-xl font-bold">Trending songs </p>
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
            {trendSongs.map((data) => (
              <SwiperSlide>
                <SongCard
                  key={data.id}
                  image={data.image}
                  songName={data.songName}
                  artists={data.artists}
                />
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
