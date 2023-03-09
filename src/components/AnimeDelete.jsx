import { Button } from "react-bootstrap"
import Image from "react-bootstrap/Image"
import { toast } from "react-toastify";


export default function AnimeDelete({ setAnimes, animeId, url }) {

  const handleDelete = () => {
    fetch(`https://final-project-backend-if.web.app/anime/${url}/${animeId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        // Check if the res status is in the 200-299 range
        if (!res.ok) {
          // If the status is not in the 200-299 range, throw an error
          throw new Error("Fetch request failed");
        }
        // If the status is in the 200-299 range, parse the res as JSON
        return res.json();
      })
      .then((data) => {
        setAnimes(data);
        toast.success("Anime was deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete anime.");
      });
  };

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