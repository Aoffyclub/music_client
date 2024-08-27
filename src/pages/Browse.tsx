import Genre from "@/components/Genre";

type category = {
  id: number;
  genre: string;
  des: string
};

const Browse = () => {
  const musicalGenres: category[] = [
    { id: 1, genre: "Pop", des: "Pop song" },
    { id: 2, genre: "Rock", des: "Rock song" },
    { id: 3, genre: "Hip-Hop", des: "Rock song" },
    { id: 4, genre: "Jazz", des: "Jazz song" },
    { id: 5, genre: "Classical", des: "Classical song" },
    { id: 6, genre: "Electronic", des: "Electronic song" },
    { id: 7, genre: "Country", des: "Country song" },
    { id: 9, genre: "Blues", des: "Blues song" },
    { id: 10, genre: "R&B", des: "R&B song" },
    { id: 11, genre: "Soul", des: "Soul song" },
    { id: 12, genre: "Funk", des: "Funk song" },
    { id: 13, genre: "Metal", des: "Metal song" },
    { id: 14, genre: "Folk", des: "Folk song" },
    { id: 15, genre: "Alternative", des: "Alternative song" },
    { id: 16, genre: "K-Pop", des: "K-Pop song" },
    { id: 17, genre: "Ambient", des: "Ambient song" },
    { id: 18, genre: "Trap", des: "Trap song" },
    { id: 19, genre: "Synthwave", des: "Synthwave song" },
    { id: 20, genre: "New Wave", des: "New Wave song" },
  ];

  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] w-[calc(100vw-250px)] text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] rounded-xl py-4 px-6">
        <h1 className="text-3xl font-bold">Music browse!</h1>
        <p className="text-lg">
          Discover new songs, artists, and albums that you like.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-8">
          {musicalGenres.map((data) => (
            <Genre key={data.id}  id={data.id} image="" genre={data.genre} des={data.des} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
