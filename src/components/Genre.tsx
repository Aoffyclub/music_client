import { ChevronRight } from "lucide-react";

type props = {
  id: number;
  image: string | undefined;
  genre: string;
  des: string;
};
const Genre = ({ id, image, genre, des}: props) => {
  const getList = (id: number) => {
    console.log(id);
  };
  return (
    <div className="h-[250px] bg-black flex flex-col items-center justify-center gap-2 rounded-xl hover:bg-[#00000070] shadow-md relative group">
      <img
        src={image}
        alt="genre"
        className="h-[230px] w-[100%] absolute rounded-xl"
      />
      <p className="text-white text-xl font-semibold">{genre}</p>
      <p className="text-[#8E8E8E] text-sm font-semibold">{des}</p>

      <div
        onClick={() => getList(id)}
        className="absolute bottom-4 right-20 p-2 bg-[#5f5b5b] text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
      >
        <ChevronRight strokeWidth={5} />
      </div>
    </div>
  );
};

export default Genre;
