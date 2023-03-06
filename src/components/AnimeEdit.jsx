import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Dropdown from "react-bootstrap/Dropdown"


export default function AnimeEdit({ animeId, setAnimes }) {

  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")
  const [image, setImage] = useState()
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("")
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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

  const handleEdit = () => {
    fetch(`https://final-project-backend-if.web.app/anime/${animeId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, info, image, review, rating })
    })
      .then(res => res.json())
      .then(setAnimes)
      .catch(console.error)
  }
  return (
    <>
      <Button onClick={handleShow} variant="text">
        <Image
          src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
          width="30px"
        />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>anime</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
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
              type="file"
              required={true}
              placeholder="Cover of the Anime"
              className="p-2"
              onChange={e => convertFile(e.target.files)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Synopsis</Form.Label>
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
            <Form.Label>Review</Form.Label>
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
          <Button className="p-2 m-auto mt-2"
            onClick={handleEdit}
          >
            Save
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}