import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./adminpost.css"
import AnimeEdit from "../components/AnimeEdit";


export default function AdminPost({ setAnimes }) {
  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")
  const [image, setImage] = useState()
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("")

  function convertFile(files) {
    if (files) {
      // picks the first file from all the files selected
      const fileRef = files[0] || ""
      // picks the type so that it can send the right one to the database
      const fileType = fileRef.type || ""
      // sets reader as a new FileReader instance 
      const reader = new FileReader()
      // converts fileref (the rile) to a binary string
      reader.readAsBinaryString(fileRef)
      reader.onload = (ev) => {
        // convert it to base64
        setImage(`data:${fileType};base64,${window.btoa(ev.target.result)}`)
      }
    }
  }

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
    <div className="form-container p-lg-3 p-md-3 p-sm-3">
      <h1 className="outside-text-form ms-2">Add a Card Here!</h1>
      <Form>
        <Form.Group>
          <Form.Label className="outside-text-three ms-2">Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            required={true}
            placeholder="Title of the Anime"
            value={title}
            className="p-2"
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="outside-text-two ms-2 text ">Rating</Form.Label>
          <Dropdown onSelect={handleSelect} className>
            <Dropdown.Toggle variant="light" className="rating-drop" >
              {!rating
                ? <p className="d-inline">Please Select One of the Options </p>
                : <p className="d-inline">{rating} </p>
              }
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1: Never Watch it ever in your life if you know what's best for you">1: Never watch it ever in your life if you know what's best for you</Dropdown.Item>
              <Dropdown.Item eventKey="2: its worth it in the backlog at the very least">2: its worth putting it in the backlog at the very least</Dropdown.Item>
              <Dropdown.Item eventKey="3: Not too bad but can for sure be better: back of the list">3: Not too bad but can for sure be better: back of the list</Dropdown.Item>
              <Dropdown.Item eventKey="4: Was pretty good: should be the next watch or two">4: Was pretty good: should be the next watch or two</Dropdown.Item>
              <Dropdown.Item eventKey="5: HOLY MOLY ANTHONY GUACAMOLE THAT WAS AMAZING WATCH IT RIGHT NOW">5: HOLY MOLY ANTHONY GUACAMOLE THAT WAS AMAZING WATCH IT RIGHT NOW</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group>
          <Form.Label className="outside-text-two ms-2">Image</Form.Label>
          <Form.Control
            name="Image"
            type="file"
            required={true}
            placeholder="Cover of the Anime"
            className="p-2"
            onChange={e => convertFile(e.target.files)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="outside-text-two ms-2">Synopsis</Form.Label>
          <Form.Control
            name="Synopsis"
            type="text"
            required={true}
            placeholder="Brief Synopsis of the Anime!"
            value={info}
            className="p-2"
            onChange={e => setInfo(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="outside-text-two ms-2">Review</Form.Label>
          <Form.Control
            name="review"
            type="text"
            required={true}
            placeholder="What's Your Thought's on the Anime?"
            value={review}
            className="p-2"
            onChange={e => setReview(e.target.value)}
          />
        </Form.Group>
        <Button className="p-2 m-auto mt-3 btn-lg"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
