import React from "react";
import LoadingScreen2 from "components/LoadingScreen/LoadingScreen2";
import axios from "axios";
import "./CourseDetail.scss";
import { Container } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Footer from "components/Footer/Footer";
import { useHistory } from "react-router-dom";
import CourseHeader from "./Course_header/CourseHeader";
import {
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  CardFooter,
  Card,
} from "reactstrap";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
export default function CourseDetail() {
  const dispatch = useDispatch();
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
  const { courseId } = useParams();
  const [orderLink, setLink] = useState("");
  console.log(orderLink);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [course, setCourse] = useState({});
  const url = `http://localhost:2002/course/view/${courseId}`;
  const LXCstate = useSelector((state) => state);
  const EnrollCourse = async () => {
    //Kiem tra xem da thanh toan khoa hoc va enroll vao khoa hoc do chua
    if (LXCstate.userDetails.enrolledCourse.indexOf(`${courseId}`) !== -1) {
      history.push(`/watching/${courseId}`);
    } else {
      await axios
        .post(
          `http://localhost:2002/course/enroll/${courseId}`,
          {
            price: course.price,
            courseId: courseId,
            courseName: course.title,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          window.location.href = response.data.url;
          // history.push(``);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status);
          }
        });
    }
  };
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourse(response.data.result);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {localStorage.token ? (
        <>
          <ExamplesNavbar />
          <div className="course_Detail_body">
            <CourseHeader title={course.title} />
            <Container>
              <div className="course_Detail_title">
                <h1>{course.title}</h1>
              </div>
              {loading ? (
                <LoadingScreen2 />
              ) : (
                <Row>
                  <Col lg="7" md="6">
                    <h3>Course Decriptsion</h3>
                    <p className="text-muted Course_Desc  ">
                      {course.courseDetails}
                      <br></br>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <h3 className="course_desc_title">
                      What You’ll Learn From This Course
                    </h3>
                    <ul>
                      <li className="text-muted">
                        Neque sodales ut etiam sit amet nisl purus non tellus
                        orci ac auctor
                      </li>
                      <li className="text-muted">
                        Tristique nulla aliquet enim tortor at auctor urna. Sit
                        amet aliquam id diam maer
                      </li>
                      <li className="text-muted">
                        Nam libero justo laoreet sit amet. Lacus sed viverra
                        tellus in hac
                      </li>
                      <li className="text-muted">
                        Tempus imperdiet nulla malesuada pellentesque elit eget
                        gravida cum sociis
                      </li>
                    </ul>
                    <h3>Certification</h3>
                    <p className="certification">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <Button color="warning" onClick={EnrollCourse}>
                      Enroll
                    </Button>
                  </Col>
                  <Col>
                    <Card
                      style={{
                        width: "20rem",
                      }}
                    >
                      <div className="card_wrapper">
                        <img alt="Sample" src={course.thumbnail} />
                        <CardBody>
                          <CardTitle tag="h3">{course.title}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
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
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                </Row>
              )}
            </Container>
          </div>
          <Footer />
        </>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
}
