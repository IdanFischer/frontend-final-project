import AnimeList from "../components/AnimeList";
import { useState } from "react";
import AnimeDelete from "../components/AnimeDelete";

export default function Home() {
  const [animes, setAnimes] = useState()
  return (
    <>
      <h1 className="outside-text text-center">The Anime Analysts</h1>
      <AnimeList 
        animes={animes}
        setAnimes={setAnimes}/>
    </>
  )
}