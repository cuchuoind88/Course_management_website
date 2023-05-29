import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./formCustom.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "components/LoadingScreen/Loading";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [bder, setBoder] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [verifyCode, setVerifyCode] = useState("");
  const url = "http://localhost:2002/student/sign-up";
  const CreateNewUser = (values) => {
    setLoading(true);
    axios
      .post(url, {
        username: values.userName,
        email: values.email,
        password: values.password,
        role: "student",
      })
      .then((response) => {
        setLoading(false);
        // history.push("/courses");
        setShowOTP(true);
        console.log(response.data);
        localStorage.setItem("email", response.data.email);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
      });
  };
  const HandleBorderColor = () => {
    setBoder("blue");
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      CreateNewUser(values);
    },
  });
  const SendOTP = async (code) => {
    await axios
      .post("http://localhost:2002/student/account/verify-account", {
        email: localStorage.getItem("email"),
        verifyCode: code,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        history.push("/courses");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
      });
    console.log(code);
  };
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ExamplesNavbar />
          <div className="wrapper">
            <div className="page-header">
              <div className="page-header-image" />
              <div className="content">
                <Container>
                  <Row>
                    <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                      <div
                        className="square square-7"
                        id="square7"
                        style={{ transform: squares7and8 }}
                      />
                      <div
                        className="square square-8"
                        id="square8"
                        style={{ transform: squares7and8 }}
                      />
                      <Card className="card-register">
                        <CardHeader>
                          <CardImg
                            alt="..."
                            src={require("assets/img/square-purple-1.png")}
                          />
                          <CardTitle tag="h4">Register</CardTitle>
                        </CardHeader>
                        <CardBody>
                          {showOTP ? (
                            <div
                              className="OTP_Code"
                              style={{
                                marginBottom: "10px",
                                outline: "none",
                                padding: "8px",
                              }}
                            >
                              <h4>Verify Code</h4>
                              <input
                                className="input_otp"
                                style={{
                                  marginBottom: "10px",
                                  outline: "none",
                                  padding: "8px",
                                }}
                                value={verifyCode}
                                onChange={(e) => {
                                  setVerifyCode(e.target.value);
                                }}
                              />
                              <button
                                color="success"
                                style={{
                                  padding: "5px",
                                  color: "blue",
                                  backgroundColor: "#fff",
                                  border: "1px solid #fff",
                                  borderRadius: "5px",
                                }}
                                size="lg"
                                onClick={() => {
                                  SendOTP(verifyCode);
                                }}
                              >
                                Send Verify Code
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={formik.handleSubmit}>
                              <>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span
                                      className={`input-group-text ${bder} `}
                                    >
                                      <i className="tim-icons icon-single-02 "></i>
                                    </span>
                                  </div>
                                  <input
                                    className={`form-control ${bder}`}
                                    id="userName"
                                    name="userName"
                                    placeholder="User name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onFocus={HandleBorderColor}
                                    value={formik.values.userName}
                                  />
                                </div>
                                {formik.touched.userName &&
                                formik.errors.userName ? (
                                  <div className="error">
                                    {formik.errors.userName}
                                  </div>
                                ) : null}
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span
                                      className={`input-group-text ${bder} `}
                                    >
                                      <i className="tim-icons icon-email-85"></i>
                                    </span>
                                  </div>
                                  <input
                                    className={`form-control ${bder}`}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                  />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                  <div className="error">
                                    {formik.errors.email}
                                  </div>
                                ) : null}
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span
                                      className={`input-group-text ${bder}`}
                                    >
                                      <i className="tim-icons icon-lock-circle"></i>
                                    </span>
                                  </div>
                                  <input
                                    className={`form-control ${bder}`}
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                  />
                                </div>
                                {formik.touched.password &&
                                formik.errors.password ? (
                                  <div className="error">
                                    {formik.errors.password}
                                  </div>
                                ) : null}
                                <Button
                                  className="btn-round"
                                  color="primary"
                                  size="lg"
                                  type="submit"
                                >
                                  Get Started
                                </Button>
                              </>
                            </form>
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  <div className="register-bg" />
                  <div
                    className="square square-1"
                    id="square1"
                    style={{ transform: squares1to6 }}
                  />
                  <div
                    className="square square-2"
                    id="square2"
                    style={{ transform: squares1to6 }}
                  />
                  <div
                    className="square square-3"
                    id="square3"
                    style={{ transform: squares1to6 }}
                  />
                  <div
                    className="square square-4"
                    id="square4"
                    style={{ transform: squares1to6 }}
                  />
                  <div
                    className="square square-5"
                    id="square5"
                    style={{ transform: squares1to6 }}
                  />
                  <div
                    className="square square-6"
                    id="square6"
                    style={{ transform: squares1to6 }}
                  />
                </Container>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
