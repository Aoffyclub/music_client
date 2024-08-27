

const Newsong = () => {
  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] w-[calc(100vw-250px)] text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] h-[1000px] rounded-xl py-4 px-6">
        <h1 className="text-3xl font-bold">Music new release!</h1>
        <p className="text-lg">
          Discover new songs, artists, and albums update here.
        </p>
      </div>
    </div>
  );
}

export default Newsong