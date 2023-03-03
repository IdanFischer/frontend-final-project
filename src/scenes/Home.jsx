import AnimeList from "../components/AnimeList";
import { useState } from "react";

export default function Home() {
  const [animes, setAnimes] = useState()
  return (
    <>
      <h1>The One Start Is Real</h1>
      <AnimeList 
        animes={animes}
        setAnimes={setAnimes}/>
    </>
  )
}