import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";

const professions = ["Web Developer", "Software Developer", "Pentester"];
const greetings = ["Salut c'est Keylian", "Alias Rickz"];

export const Banner = () => {
  const [professionIndex, setProfessionIndex] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 1500;

  useEffect(() => {
    let ticker = setInterval(() => {
      rotateProfession();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const rotateProfession = () => {
    let i = professionIndex % professions.length;
    let fullText = professions[i];

    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
      // Vérifie si c'est la dernière profession ou "Alias Rickz"
      if (i === professions.length - 1 || greetings[greetingIndex] === "Alias Rickz") {
        setTimeout(() => {
          setIsDeleting(false);
          setProfessionIndex(0);
          setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 5000);
      }
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setProfessionIndex((prevIndex) => prevIndex + 1);
      setDelta(500);
    }
  };

  useEffect(() => {
    let greetingTicker = setInterval(() => {
      rotateGreeting();
    }, 25000);

    return () => {
      clearInterval(greetingTicker);
    };
  }, [greetingIndex]);

  const rotateGreeting = () => {
    if (greetingIndex === 0) {
      setGreetingIndex(1);
      setTimeout(() => {
        setGreetingIndex(0);
      }, 10000);
    } else {
      setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    <span className={`greeting-text animate__animated ${isVisible ? "animate__fadeInDown" : ""}`}>
                      {greetings[greetingIndex]}<br />
                    </span>{" "}
                    {greetingIndex === 0 && (
                      <span
                        className="txt-rotate"
                        dataPeriod="1000"
                        data-rotate='["Web Developer", "Software Developer", "Pentester", "Alias Rickz"]'
                      >
                        <span className={`wrap animate__animated ${isVisible ? "animate__fadeIn" : ""}`}>{text}</span>
                      </span>
                    )}
                  </h1>
                  <p>
                    Je suis passionné de cybersécurité, de programmation Python et de pentest. Mon parcours est axé
                    sur la protection des systèmes et des données sensibles. Je maîtrise la programmation en Python et je
                    développe des solutions logicielles sécurisées. Je suis également compétent en tests de pénétration,
                    identifiant les vulnérabilités pour renforcer la sécurité des systèmes. Mon portfolio témoigne de mon
                    expertise dans ces domaines captivants. Je suis ouvert aux opportunités de collaboration pour
                    contribuer à un avenir numérique plus sûr. Contactez-moi pour en savoir plus sur mon travail et mes
                    compétences. Ensemble, renforçons la cybersécurité.
                  </p>
                  <button onClick={() => console.log("connect")}>
                    Let’s Connect <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
