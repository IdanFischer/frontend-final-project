import { useState } from "react"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export default function AnimeCard(anime, show, setShow) {

  const handleClose = () => setShow(false);

  return (
    <>
      {!anime
        ? <h1>Loading...</h1>
        : anime.map(element => (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{element.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body key={element._id}> {element.info} {element.rating} {element.review}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        ))
      }
    </>
  )
}
