export interface Category {
  genreId: number;
  image: string;
  genre: string;
  des: string;
  bgColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface Song {
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