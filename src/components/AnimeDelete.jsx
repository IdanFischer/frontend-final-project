import { Button } from "react-bootstrap"
import Image from "react-bootstrap/Image"


export default function AnimeDelete({ setAnimes, animeId }) {

  const handleDelete = () => {
    fetch(`https://final-project-backend-if.web.app/anime/${animeId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(setAnimes)
      .catch(console.error)
  }

  return (
    <>
      <Button onClick={handleDelete} variant="text">
        <Image
          src="https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png"
          width="30px"
        />
      </Button>
     
    </>
  )
}