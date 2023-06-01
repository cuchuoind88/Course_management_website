import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import Footer from "components/Footer/Footer";
import SidebarCourse from "./SidebarCourse";
import CourseHeader from "../Course_header/CourseHeader";
import WallE from "components/LoadingScreen/WallE";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import "./CoursePlayer.scss";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Playes from "./Playes";
export default function CoursePlayer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const LXCstate = useSelector((state) => state);
  const [complete, setComplete] = useState([]);
  const [unlock, setUnlock] = useState([]);
  console.log(LXCstate);
  const verifyLogin = async () => {
    if (localStorage.token) {
      const decode = jwt_decode(localStorage.getItem("token"));
      console.log(decode);
      dispatch({
        type: "LOG_IN",
        payload: decode,
      });
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        dispatch({
          type: "LOG_OUT",
        });
      }
    }
  };
  const grabUserDetails = () => {
    axios
      .get("http://localhost:2002/student/view-profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFlag(true);
        dispatch({
          type: "POPULATE_USER_DETAILS",
          payload: response.data.result,
        });
        console.log(LXCstate);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    verifyLogin();
    grabUserDetails();
  }, []);
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  useEffect(() => {
    if (flag) {
      axios
        .get(`http://localhost:2002/course/viewenrolled/${courseId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data.result);
          setLoading(false);
          setCourse(response.data.result);
          setUnlock((pre) => {
            return [...pre, response.data.result.chapters[0].lessons[0]._id];
          });
          dispatch({
            type: "SAVE_LESSON",
            payload: response.data.result.chapters[0].lessons[0],
          });
          dispatch({
            type: "SAVE_NEXT_LESSON",
            payload: response.data.result.chapters[0].lessons[1],
          });
        });
    }
  }, [flag]);
  // if (
  //   !LXCstate.auth.username ||
  //   !LXCstate.userDetails.enrolledCourse.indexOf(`${courseId}`) !== -1
  // ) {
  //   return <Redirect to="/home" />;
  // }
  return (
    <>
      {localStorage.token ? (
        <div>
          {loading ? (
            <WallE />
          ) : LXCstate.userDetails.enrolledCourse.indexOf(`${courseId}`) !==
            -1 ? (
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
                          unlock={unlock}
                          setUnlock={setUnlock}
                          setComplete={setComplete}
                        />
                      ) : (
                        <div></div>
                      )}
                    </Col>
                    <Col className="sidebar_col">
                      <SidebarCourse
                        chapters={course.chapters}
                        complete={complete}
                        unlock={unlock}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
              <Footer />
            </div>
          ) : (
            <Redirect to="/courses" />
          )}
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
}
