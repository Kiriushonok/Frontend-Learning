import { songs } from "../data.js";
import Song from "./Song/Song.jsx";

export default function SongSection() {
  return songs.map((song, index) => (
    <Song key={index} author={song.author} name={song.name} />
  ));
}
