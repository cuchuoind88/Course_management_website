import IndexNavbar from "components/Navbars/IndexNavbar";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/Footer/Footer";
import { useDispatch } from "react-redux";
import {
  CardBody,
  Container,
  Col,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  CardFooter,
} from "reactstrap";
import { Card } from "reactstrap";
import { Row } from "reactstrap";
import "./Course.scss";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen2 from "components/LoadingScreen/LoadingScreen2";
import CourseHeader from "./Course_header/CourseHeader";
import CourseSearch from "./Course_Search/CourseSearch";
export default function Course() {
  // React.useEffect(() => {
  //   document.body.classList.toggle("index-page");
  //   //  clean up after this effect:
  //   return function cleanup() {
  //     document.body.classList.toggle("index-page");
  //   };
  // }, []);
  const LXCstate = useSelector((state) => state);
  const dispatch = useDispatch();
  const verifyLogin = () => {
    if (localStorage.token) {
      const decode = jwt_decode(localStorage.getItem("token"));
      console.log(decode);
      dispatch({
        type: "LOG_IN",
        payload: decode,
      });
      //token hêt han sau 15 ngay , kiem tra xem token con han không nếu không sẽ log-out
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        dispatch({
          type: "LOG_OUT",
        });
      }
    }
  };
  // verifyLogin();
  const grabUserDetails = () => {
    axios
      .get("http://localhost:2002/student/view-profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
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
    grabUserDetails();
    verifyLogin();
  }, []);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:2002/course/viewall";
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourses(response.data.result);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {localStorage.token ? (
        <>
          <IndexNavbar />
          <div className="wrapper_course">
            {/* <div className="course_header">
          <Container>
            <h1>Archives: Courses</h1>
            <h3>Learn Anything, Anytime, Anywhere with Our Online Courses!</h3>
          </Container>
        </div> */}
            <CourseHeader title="Archives: Courses" />
            <Container>
              <div className="course_body">
                <CourseSearch />
                {loading ? (
                  <LoadingScreen2 />
                ) : (
                  <Row>
                    {courses?.map((course) => {
                      return (
                        <Col
                          lg="4"
                          md="6"
                          key={course._id}
                          className="Course_item"
                        >
                          <Card
                            style={{
                              width: "19rem",
                            }}
                          >
                            <div className="card_wrapper">
                              <div className="thumbnail">
                                <img alt="Sample" src={course.thumbnail} />
                                <span className="time_discount">
                                  <i class="tim-icons icon-time-alarm"></i>
                                  20 Hours
                                </span>
                              </div>
                              <CardBody>
                                <CardTitle tag="h3">{course.title}</CardTitle>
                                <CardSubtitle
                                  className="mb-2 text-muted"
                                  tag="h6"
                                >
                                  <i class="tim-icons icon-tap-02"></i>
                                  <p>{course.views} viewed</p>
                                </CardSubtitle>
                                <CardText>
                                  Skills you'll gain: Front-End Web Development,
                                  Full-Stack Web Development
                                </CardText>
                                <CardText>
                                  <div className="Price">
                                    <i class="tim-icons icon-coins"></i>
                                    <p>{course.price}</p>
                                  </div>
                                  <div className="Enrollment">
                                    <i class="tim-icons icon-single-02"></i>
                                    <p>{course.enrolledCount} Students</p>
                                  </div>
                                </CardText>
                                <Button color="warning">
                                  <Link
                                    to={`/learning/${course._id}`}
                                    className="text-white"
                                  >
                                    Click For Details
                                  </Link>
                                </Button>
                              </CardBody>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </div>
            </Container>
            <Footer />
          </div>{" "}
        </>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
}
