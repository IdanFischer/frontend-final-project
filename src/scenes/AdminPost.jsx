import { useState } from "react";
import Form from "react-bootstrap/Form";


export default function AdminPost() {
  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")
  const [image, setImage] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("")

  return (
    <>
      <h1>Add a Card Here!</h1>
      <Form>
      <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Title of the Anime"
            value={title}
            className="p-2"
            onChange={e => setTitle(e.target.value)} 
            />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="Image"
            type="text"
            placeholder="Cover of the Anime"
            value={info}
            className="p-2"
            onChange={e => setImage(e.target.value)} 
            />
        </Form.Group>

        <Form.Group>
          <Form.Label>Synopsis</Form.Label>
          <Form.Control
            name="Synopsis"
            type="text"
            placeholder="Brief Synopsis of the Anime!"
            value={info}
            className="p-2"
            onChange={e => setInfo(e.target.value)} 
            />
        </Form.Group>

        <Form.Group>
          <Form.Label>Review</Form.Label>
          <Form.Control
            name="review"
            type="text"
            placeholder="What's Your Thought's on the Anime?"
            value={review}
            className="p-2"
            onChange={e => setReview(e.target.value)} 
            />
        </Form.Group>

      </Form>

    </>
  )
}
