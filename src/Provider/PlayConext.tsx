import React, { useState, createContext, useRef, useEffect } from "react";

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
interface Time {
  second: number;
  minute: number;
}

// Define the PlayContext interface
interface PlayContextType {
  selectedSong: Song | null;
  isPlaying: boolean;
  currentTime: Time;
  endTime: Time;
  seekbar: number;
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
  const [seekbar, setSeekbar] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<Time>({
    second: 0,
    minute: 0,
  });

  const [endTime, setEndTime] = useState<Time>({
    second: 0,
    minute: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to set the current song
  const setSongToPlay = (song: Song) => {
    setSelectedSong(song);
    console.log(song);
  };

  // Function to handle play/pause functionality
  const playPauseClick = () => {
    setIsPlaying((prev) => !prev);
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    console.log(endTime);
  };

  useEffect(() => {
    const audioElement = audioRef?.current;

    if (audioElement) {
      audioElement.ontimeupdate = () => {
        setSeekbar(
          Math.floor((audioElement.currentTime / audioElement.duration) * 100)
        );
        setCurrentTime({
          second: Math.floor(audioElement.currentTime % 60),
          minute: Math.floor(audioElement.currentTime / 60),
        });

        setEndTime({
          second: Math.floor(audioElement.duration % 60),
          minute: Math.floor(audioElement.duration / 60),
        });
      };

      audioElement.onended = () => {
        setIsPlaying(false);
      };
    }

    // Cleanup function to remove the event listener
    return () => {
      if (audioElement) {
        audioElement.ontimeupdate = null;
      }
    };
  }, [audioRef]);

  return (
    <PlayerContext.Provider
      value={{
        selectedSong,
        isPlaying,
        audioRef,
        currentTime,
        endTime,
        seekbar,
        playPauseClick,
        setSongToPlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
