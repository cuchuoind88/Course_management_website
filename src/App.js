import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import Index from "views/Index.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Course from "views/examples/Course";
import CourseDetail from "views/examples/CourseDetail";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={(props) => <Index {...props} />} />
        <Route path="/courses" render={(props) => <Course {...props} />} />
        <Route
          path="/learning/:courseId"
          render={(props) => <CourseDetail {...props} />}
        />
        <Route
          path="/register-page"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />

        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
