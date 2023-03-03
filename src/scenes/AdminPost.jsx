import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./adminpost.css"


export default function AdminPost({ setAnimes }) {
  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")
  const [image, setImage] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("")

  console.log({rating})

  const handleSelect = e => {
    setRating(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("https://final-project-backend-if.web.app/anime", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, info, image, review, rating })
    })
      .then(res => res.json())
      .then(setAnimes)
      .catch(console.error)

    setTitle("")
    setInfo("")
    setImage("")
    setReview("")
    setRating("")
  }



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
          <Form.Label>Rating</Form.Label>
          <Dropdown onSelect={handleSelect} className>
            <Dropdown.Toggle variant className="dropdown-margin">
              {!rating
              ? <p className="d-inline">Please Select One</p>
              : <p className="d-inline">{rating}</p>
              }
            </Dropdown.Toggle>
                  
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">1</Dropdown.Item>
              <Dropdown.Item eventKey="2">2</Dropdown.Item>
              <Dropdown.Item eventKey="3">3</Dropdown.Item>
              <Dropdown.Item eventKey="4">4</Dropdown.Item>
              <Dropdown.Item eventKey="5">5</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="Image"
            type="text"
            placeholder="Cover of the Anime"
            value={image}
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
        <Button className="p-2 m-auto mt-2" onClick={handleSubmit}>
          Submit
        </Button>

      </Form>

    </>
  )
}
