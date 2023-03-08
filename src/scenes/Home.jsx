import AnimeList from "../components/AnimeList";
import { useState } from "react";
import AnimeDelete from "../components/AnimeDelete";

export default function Home({ url }) {
  const [animes, setAnimes] = useState()
  // console.log(`home url: ${url}`)
  return (
    <>
      <AnimeList 
        url={url}
        animes={animes}
        setAnimes={setAnimes}/>
    </>
  )
}