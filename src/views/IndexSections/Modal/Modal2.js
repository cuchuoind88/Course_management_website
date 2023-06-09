import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormGroup,
  Modal,
  Input,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import "./Modal.scss";
export default function Modal2({
  formModal,
  setFormModal,
  loading,
  setLoading,
  error,
  setError,
}) {
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);

  //Get user inform after login
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
  const url = "http://localhost:2002/student/login";
  const history = useHistory();
  const [bder, setBoder] = useState("");
  console.log("modal");
  const loginHandle = (values) => {
    setLoading(true);
    axios
      .post(url, {
        username: values.userName,
        password: values.password,
      })
      .then((response) => {
        setLoading(false);
        history.push("/courses");
        localStorage.setItem("token", response.data.token);
        const decode = jwt_decode(response.data.token);
        console.log(decode);
        dispatch({
          type: "LOG_IN",
          payload: decode,
        });
        console.log(LXCstate);
        grabUserDetails();
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          setError(true);
          console.log(err.response);
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      loginHandle(values);
    },
  });
  const HandleBorderColor = () => {
    setBoder("blue");
  };

  return (
    <Modal
      modalClassName="modal-black"
      isOpen={formModal}
      toggle={() => setFormModal(false)}
    >
      <div className="modal-header justify-content-center">
        <button className="close" onClick={() => setFormModal(false)}>
          <i className="tim-icons icon-simple-remove text-white" />
        </button>
        <div className="text-muted text-center ml-auto mr-auto">
          <h3 className="mb-0">Sign in with</h3>
        </div>
      </div>
      <div className="modal-body">
        <div className="btn-wrapper text-center">
          <Button
            className="btn-neutral btn-icon"
            color="default"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <img alt="..." src={require("assets/img/search.png")} />
          </Button>
          <Button
            className="btn-neutral btn-icon"
            color="default"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <img alt="..." src={require("assets/img/facebook.png")} />
          </Button>
        </div>
        <div className="text-center text-muted mb-4 mt-3">
          <small>Or sign in with credentials</small>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className={`input-group-text ${bder} `}>
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
                value={formik.values.userName}
                onFocus={HandleBorderColor}
              />
            </div>
            {formik.touched.userName && formik.errors.userName ? (
              <div className="error">{formik.errors.userName}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <div className="input-group">
              <InputGroupAddon addonType="prepend">
                <InputGroupText className={`form-control ${bder}`}>
                  <i className="tim-icons icon-key-25" />
                </InputGroupText>
              </InputGroupAddon>
              <input
                className={`form-control ${bder}`}
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onFocus={HandleBorderColor}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </FormGroup>
          <FormGroup check className="mt-3">
            <Label check>
              <Input defaultChecked type="checkbox" />
              <span className="form-check-sign" />
              Remember me!
            </Label>
            <h5 className="forgot_password">
              <Link to="/account-reset">Forgot password?</Link>
            </h5>
          </FormGroup>
          <div className="text-center">
            {error && (
              <p className="text-danger">Incorrect userName or password !</p>
            )}
            <Button className="my-4" color="primary" type="submit">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
