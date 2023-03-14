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
    <div className="background-image-list">
      {!animes ?
        <h1 className="outside-text text-center">Loading...</h1>
        :
        <Container fluid>
          <Row className="justify-content-center">
            {animes.map((element) => (
              <Col sm={11} lg={3} key={element._id}>
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
                      currentTitle={element.title}
                      currentSynopsis={element.info}
                      currentImage={element.image}
                      currentRating={element.rating}
                      currentReview={element.review}
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
            <h2 className="each-anime-body-h2">Synopsis:</h2>
            <p className="each-anime-body-p">{selectedAnime.info}</p> 
            <h2 className="each-anime-body-h2">Rating:</h2>
            <p className="each-anime-body-p">⭐️{selectedAnime.rating}⭐️</p> 
            <h2 className="each-anime-body-h2">Review:</h2>
            <p className="each-anime-body-p">{selectedAnime.review}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-list" variant="outline-info" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>

    </>
  );
}