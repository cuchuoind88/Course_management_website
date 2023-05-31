import React from "react";
import "./ResetPassword.scss";
import Footer from "components/Footer/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Container } from "reactstrap";
export default function ResetPassword() {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:2002/student/reset-password", {
          password: values.password,
          token: token,
          userId: id,
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          history.push("/home");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status);
          }
        });
    },
  });
  return (
    <div className="forgot_wrapper">
      <Container>
        <Row>
          <Col lg="7">
            <div className="left_content_wrapper">
              <div className="left_content_header">
                <div className="left_content_header_logo">
                  <svg
                    id="logo-35"
                    width="50"
                    height="39"
                    viewBox="0 0 50 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                      class="ccompli1"
                      fill="#007AFF"
                    ></path>{" "}
                    <path
                      d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                      class="ccustom"
                      fill="#312ECB"
                    ></path>{" "}
                  </svg>
                </div>
                <h4 className="left_content_header_title">LXC Course Online</h4>
              </div>
              <div className="left_content_body">
                <img src="https://webdevstudios.org/_next/image/?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fauth%2FAuthImage1.d212cbf00428cbdc7e1b9655f3bf14bb.png&w=640&q=75" />
              </div>
            </div>
          </Col>
          <Col lg="5">
            <Card className="card_forgot">
              <CardHeader>
                <CardTitle tag="h1" className="card_forgot_header">
                  RESET
                </CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={formik.handleSubmit}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input_email_title">New password</span>
                    </div>
                    <input
                      className="input_email"
                      placeholder="Password"
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                  <Button
                    className="btn_submit"
                    color="primary"
                    size="lg"
                    type="submit"
                  >
                    SEND
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
