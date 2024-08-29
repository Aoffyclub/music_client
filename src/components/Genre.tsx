import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type props = {
  id: number;
  image: string | undefined;
  genre: string;
  des: string;
};
const Genre = ({ id, image, genre, des }: props) => {
  const navigate = useNavigate();
  const getList = (id: number) => {
    navigate(`/browse/${id}`);
  };
  return (
    <div className="h-[250px] bg-black flex flex-col items-center justify-center gap-2 rounded-xl hover:bg-[#00000070] shadow-md relative group overflow-hidden">
      <img
        src={image}
        alt="genre"
        className="h-[100%] w-[100%] absolute rounded-xl  group-hover:scale-110 hover:duration-200"
      />

      <div className="flex flex-col items-center gap-1 z-10">
        <p className="text-white text-3xl font-bold">{genre}</p>
        <p className="text-white text-base font-semibold">{des}</p>
      </div>

      <div
        onClick={() => getList(id)}
        className="cursor-pointer absolute bottom-4 right-20 p-2 bg-[#5f5b5b] text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
      >
        <ChevronRight strokeWidth={5} />
      </div>
    </div>
  );
};

export default Genre;
