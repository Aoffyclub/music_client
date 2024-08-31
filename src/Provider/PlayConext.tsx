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
  allSongs: Song ;
  volume : number ;
  isPlaying: boolean;
  currentTime: Time;
  endTime: Time;
  seekbar: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  playClick: () => void;
  puaseClick: () => void;
  setSongToPlay: (song: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  collectAllSongs: (songs: Song[]) => void;
}

// Create the PlayerContext with a default value of null
const PlayerContext = createContext<PlayContextType | null>(null);

// Define the PlayerProvider component
const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allSongs, setAllSongs] = useState<Song[] | null>([]);
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
  const setSongToPlay = (song: number) => {

    const selectSong = allSongs?.find((s) => s.songId === song) || null;
    setSelectedSong(selectSong);

    setTimeout(() => {
      playClick();
    }, 300);
  };

  const collectAllSongs = (songs: Song[]) => {
    setAllSongs(songs);
    console.log(songs);
    
  };

  const playClick = () => {
    if (audioRef?.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const puaseClick = () => {
    if (audioRef?.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

const nextSong = () => {
  if (!allSongs) return;

  const currentIndex = allSongs.findIndex((s) => s.songId === selectedSong?.songId) || 0;
  const nextIndex = (currentIndex + 1) % allSongs.length;
  setSongToPlay(allSongs[nextIndex].songId);
};

const prevSong = () => {
  if (!allSongs) return;
  const currentIndex = allSongs.findIndex((s) => s.songId === selectedSong?.songId) || 0;
  const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
  setSongToPlay(allSongs[prevIndex].songId);
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
        playClick,
        puaseClick,
        setSongToPlay,
        collectAllSongs,
        nextSong,
        prevSong,
        allSongs,
       
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
