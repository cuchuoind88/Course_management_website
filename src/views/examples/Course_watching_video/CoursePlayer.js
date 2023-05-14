import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import Footer from "components/Footer/Footer";
import SidebarCourse from "./SidebarCourse";
import CourseHeader from "../Course_header/CourseHeader";
import WallE from "components/LoadingScreen/WallE";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CoursePlayer.scss";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Playes from "./Playes";
export default function CoursePlayer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const LXCstate = useSelector((state) => state);
  const [complete, setComplete] = useState([]);
  console.log(LXCstate);
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:2002/course/viewenrolled/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoading(false);
        console.log(response.data.result);
        setCourse(response.data.result);
        dispatch({
          type: "SAVE_LESSON",
          payload: response.data.result.chapters[0].lessons[0],
        });
      });
  }, []);
  return LXCstate.auth.username ? (
    loading ? (
      <WallE />
    ) : (
      <div className="Course_Watching">
        <ExamplesNavbar />
        <div className="Course_Player_body">
          <CourseHeader title="Archives: Courses" />
          <Container>
            <Row>
              <Col lg="9" className="sidebar_player">
                {LXCstate.currentLesson ? (
                  <Playes
                    course={course}
                    complete={complete}
                    setComplete={setComplete}
                  />
                ) : (
                  <div></div>
                )}
              </Col>
              <Col className="sidebar_col">
                <SidebarCourse chapters={course.chapters} complete={complete} />
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    )
  ) : (
    <Redirect to="/home" />
  );
}
