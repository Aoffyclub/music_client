

const Favorite = () => {
  return (
    <div className="flex flex-col bg-[#000] p-3 h-[100%] md:w-[calc(100vw-250px)] w-full text-white overflow-scroll no-scrollbar">
      <div className="flex flex-col gap-2 bg-gradient-to-b from-[#070707] via-[#1d1c1c]  to-[#070707] w-[100%] h-[1000px] rounded-xl md:py-4 py-2 md:px-6 px-3">
        <h1 className="text-3xl font-bold">Favorite</h1>
        <p className="text-lg">your song that you like.</p>
      </div>
    </div>
  );
}

export default Favorite