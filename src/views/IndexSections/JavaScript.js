import React from "react";
import ReactDatetime from "react-datetime";
import "./Javascript.scss";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const carouselItems1 = [
  {
    src: require("assets/img/reading-gd8e882300_1280.jpg"),
    altText: "Slide 1",
    caption: "",
  },
  {
    src: require("assets/img/math.jpg"),
    altText: "Slide 2",
    caption: "",
  },
  {
    src: require("assets/img/kids-g7d30be496_1280.jpg"),
    altText: "Slide 3",
    caption: "",
  },
];
const carouselItems2 = [
  {
    src: require("assets/img/never-stop-learning-g068b1f4ad_1280.jpg"),
    altText: "Slide 1",
    caption: "",
  },
  {
    src: require("assets/img/person-g46b5d2913_1280.jpg"),
    altText: "Slide 2",
    caption: "",
  },
  {
    src: require("assets/img/child-g7c658bb76_1920.jpg"),
    altText: "Slide 3",
    caption: "",
  },
];
const carouselItems3 = [
  {
    src: require("assets/img/toddler-g38fb807fe_1280.jpg"),
    altText: "Slide 1",
    caption: "",
  },
  {
    src: require("assets/img/teacher-g7c39a5c19_1280.jpg"),
    altText: "Slide 2",
    caption: "",
  },
  {
    src: require("assets/img/children-g3120b8a23_1280.jpg"),
    altText: "Slide 3",
    caption: "",
  },
];
export default function JavaScript({ formModal, setFormModal }) {
  return (
    <div className="section section-javascript" id="javascriptComponents">
      <img alt="..." className="path" src={require("assets/img/path5.png")} />
      <img
        alt="..."
        className="path path1"
        src={require("assets/img/path5.png")}
      />
      <br />
      <div className="section">
        <Container>
          <div className="title">
            <h1>About us</h1>
          </div>
          <Row className="justify-content-between align-items-center ">
            <Col className="mb-5 mb-lg-0" lg="5">
              <h1 className="text-black font-weight-light lh-lg">
                Take the next step toward your personal and professional goals
                with LXC.
              </h1>
              <p className="text-black mt-4 lh-lg">
                Join now to receive personalized recommendations from the full
                Coursera LXC.
              </p>
              <Button
                className="mt-4"
                color="warning"
                onClick={() => setFormModal(true)}
              >
                Click for detail
              </Button>
            </Col>
            <Col lg="6">
              <UncontrolledCarousel
                items={carouselItems1}
                indicators={false}
                autoPlay={false}
              />
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center mt-5 intro">
            <Col lg="6">
              <UncontrolledCarousel
                items={carouselItems2}
                indicators={false}
                autoPlay={false}
              />
            </Col>
            <Col className="mb-5 mb-lg-0" lg="5">
              <h1 className="text-black font-weight-light lh-lg">
                Learn from anywhere, at any time!
              </h1>
              <p className="text-black mt-4 lh-lg">
                Our online learning platform offers a variety of courses to help
                you achieve your goals. Start learning today and unlock your
                potential!
              </p>
              <Button
                className="mt-4"
                color="warning"
                onClick={() => setFormModal(true)}
              >
                Join with us
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center intro">
            <Col className="mb-5 mb-lg-0" lg="5">
              <h1 className="text-black font-weight-light lh-lg">
                Become an instructor
              </h1>
              <p className="text-black mt-4 lh-lg">
                Instructors from around the world teach millions of students on
                Udemy. We provide the tools and skills to teach what you love.
              </p>
              <Button
                className="mt-4"
                color="warning"
                onClick={() => setFormModal(true)}
              >
                Start teaching today
              </Button>
            </Col>
            <Col lg="6">
              <UncontrolledCarousel
                items={carouselItems3}
                indicators={false}
                autoPlay={false}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
