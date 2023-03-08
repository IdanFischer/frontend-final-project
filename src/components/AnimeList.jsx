import { useEffect, useState } from "react";
import AnimeDelete from "./AnimeDelete";
import AnimeEdit from "./AnimeEdit";
import { Card, Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./animelist.css";

export default function AnimeList({ animes, setAnimes, url }) {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // console.log("Anime List url: ",url)

  useEffect(() => {
    // 127.0.0.1:5002
    // https://final-project-backend-if.web.app/anime
    fetch(`https://final-project-backend-if.web.app/anime/${url}`)
      .then((res) => res.json())
      .then(setAnimes)
      .catch(console.error);
  }, [setAnimes, url]);

  return (
    <>
      {!animes ?
        <h1 className="outside-text text-center">Loading...</h1>
        :
        <Container fluid>
          <Row>
            {animes.map((element) => (
              <Col sm={12} md={4} lg={3} key={element._id}>
                <Card className="each-card border border-2 border-primary">
                  <Image
                    onClick={() => { setSelectedAnime(element); handleShow() }} src={element.image} className="anime-image"
                  />
                  <div className="border-image"></div>
                  <h2 className="anime-card-title text-center">{element.title}</h2>
                  <Row className="justify-content-center">
                    <Col xs={6} className="text-center">
                      <AnimeDelete
                        url={url}
                        setAnimes={setAnimes}
                        animeId={element._id}
                      />

                    <AnimeEdit
                      url={url}
                      setAnimes={setAnimes}
                      selectedAnime={selectedAnime}
                      animeId={element._id}
                    />
                    </Col>
                    
                  </Row>
                </Card>

              </Col>
            ))}
          </Row>
        </Container>
      }

      {selectedAnime && (
        <Modal show={show} onHide={handleClose} size="xl" >
          <Modal.Header closeButton>
            <Modal.Title className="each-anime-title">{selectedAnime.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-each-anime">
            <p className="each-anime-body">{selectedAnime.info}</p> <p className="each-anime-body">⭐️{selectedAnime.rating}⭐️</p> <p className="each-anime-body">{selectedAnime.review}</p>
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