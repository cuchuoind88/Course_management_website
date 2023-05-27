import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import Index from "views/Index.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import CourseSearch from "views/examples/Course_Search/CourseSearch";
import Course from "views/examples/Course";
import CourseDetail from "views/examples/CourseDetail";
import CoursePlayer from "views/examples/Course_watching_video/CoursePlayer";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io.connect("http://localhost:2002");
    console.log(socket);
    dispatch({
      type: "SET_SOCKET",
      payload: socket,
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={(props) => <Index {...props} />} />
        <Route path="/courses" render={(props) => <Course {...props} />} />
        <Route
          path="/learning/:courseId"
          render={(props) => <CourseDetail />}
        />
        <Route
          path="/register-page"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          path="/watching/:courseId"
          render={(props) => <CoursePlayer />}
        />
        {/* <Route path="/search" render={(props) => <CourseSearch {...props} />} /> */}
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
