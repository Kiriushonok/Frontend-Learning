import { useState } from "react";
import { songs } from "../data.js";
import Button from "./Button/Button.jsx";

export default function ButtonsSection() {
    const [selectedSong, setSelectedSong] = useState(null)

  function handleClick(author) {
    setSelectedSong(songs.find((song) => author === song.author))
  }

    return (
        <>
        <Button isActive={selectedSong?.author === "ДДТ"} onClick={() => handleClick("ДДТ")}>Это всё</Button>
        <Button isActive={selectedSong?.author === "The Hatters"} onClick={() => handleClick("The Hatters")}>Танцы</Button>
        <Button isActive={selectedSong?.author === "The Hatters, Tritia"} onClick={() => handleClick("The Hatters, Tritia")}>Где-то там</Button>
        <Button isActive={selectedSong?.author === "InWhite"} onClick={() => handleClick("InWhite")}>Спокойных снов</Button>

        {selectedSong && <p>{selectedSong.description}</p>}
        {!selectedSong && <p>Нажмите на кнопку</p>}
        </>
    )
}