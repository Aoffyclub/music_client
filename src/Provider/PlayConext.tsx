import React, { useState, createContext, useRef } from "react";

// Define the Song interface
interface Song {
  songId: number;
  image: string;
  songName: string;
  artist: string;
  audio: string;
  duration: string;
  genreId: number;
  createdAt: string;
  updatedAt: string;
}

// Define the PlayContext interface
interface PlayContextType {
  selectedSong: Song | null;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  playPauseClick: () => void;
  setSongToPlay: (song: Song) => void;
}

// Create the PlayerContext with a default value of null
const PlayerContext = createContext<PlayContextType | null>(null);

// Define the PlayerProvider component
const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to set the current song
  const setSongToPlay = (song: Song) => {
    setSelectedSong(song);
    console.log(song);
  };

  // Function to handle play/pause functionality
  const playPauseClick = () => {
    setIsPlaying((prev) => !prev);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        selectedSong,
        isPlaying,
        audioRef,
        playPauseClick,
        setSongToPlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
