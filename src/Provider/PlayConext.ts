import { useState, createContext, ReactNode, FC } from "react";



interface Song {
  songId: number;
  image: string,
  songName: string,
  artist: string,
  audio: string,
  duration: string,
  genreId: number,
  createdAt: string;
  updatedAt: string;

}

interface playContext  {
    setSongToPlay: (song: Song) => void;
} 

const PlayerContext = React.createContext<playContext | null>();

// Define the PlayerProvider component
const PlayerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
 
  const [selectSong, SetSelectSong] = useState< Song | null >();

  const setSongToPlay = (song: Song) => {
    SetSelectSong(song);
    // play the audio file
  }



  return (
    <PlayerContext.Provider value={{setSongToPlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
