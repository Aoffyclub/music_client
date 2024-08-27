import SongCard from "@/components/SongCard";
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

const Home = () => {

  const [sliders, setSliders] = useState<number>(1)
  const newSongs: SongCard[] = [
    { id: 1, image: "image1.jpg", songName: "Song One", artists: "Artist A" },
    { id: 2, image: "image2.jpg", songName: "Song Two", artists: "Artist B" },
    { id: 3, image: "image3.jpg", songName: "Song Three", artists: "Artist C" },
    { id: 4, image: "image4.jpg", songName: "Song Four", artists: "Artist D" },
    { id: 5, image: "image5.jpg", songName: "Song Five", artists: "Artist E" },
    { id: 6, image: "image6.jpg", songName: "Song Six", artists: "Artist F" },
  ];
  const popularSongs: SongCard[] = [
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

  useEffect(()=> {
     const updateSlidesPerView = () => {
       const width : number = window.innerWidth;
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

  }, [])

  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] w-[calc(100vw-250px)] text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] h-[1000px] rounded-xl py-4 px-6">
        <h1 className="text-3xl font-bold">Welcome to Music !</h1>
        <p className="text-lg">
          Discover new songs, artists, and albums to add to your playlist.
        </p>

        <p className="text-xl font-bold mt-5">New song release </p>
        <div>
          <Swiper
            slidesPerView={sliders}
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

        <p className="text-xl font-bold">Popular song </p>
        <div>
          <Swiper
            slidesPerView={sliders}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {popularSongs.map((data) => (
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
      </div>
    </div>
  );
};

export default Home;
