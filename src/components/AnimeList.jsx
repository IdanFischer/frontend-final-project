import { useEffect, useState } from "react";
import AnimeDelete from "./AnimeDelete";
import { Card, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./animelist.css";

export default function AnimeList({ animes, setAnimes }) {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetch("https://final-project-backend-if.web.app/anime")
      .then((res) => res.json())
      .then(setAnimes)
      .catch(console.error);
  }, [setAnimes]);

  return (
    <>
      {!animes ?
        <h1>Loading...</h1>
        :
        <Container fluid>
          <Row>
            {animes.map((element) => (
              <Col sm={12} md={4} lg={3} key={element._id}>
                <Card className="each-card">
                  <Image 
                  onClick={() => { setSelectedAnime(element); handleShow() }} src={element.image} className="anime-image" 
                  />
                  <h2>{element.title}</h2>
                  {/* <Row>
                    <Col> */}
                  <AnimeDelete
                    setAnimes={setAnimes}
                    animeId={element._id}
                  />
                  {/* </Col>
                  </Row> */}
                </Card>

              </Col>
            ))}
          </Row>
        </Container>
      }

      {selectedAnime && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedAnime.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedAnime.info}</p> <p>⭐️{selectedAnime.rating}</p> <p>{selectedAnime.review}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}