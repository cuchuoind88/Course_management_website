import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Player.scss";
export default function Playes({ course, complete, setComplete }) {
  const LXCstate = useSelector((state) => state);
  const HandleProcess = ({ played }) => {
    console.log(played);
    if (played >= 0.9) {
      if (complete) {
        if (!complete.includes(LXCstate.currentLesson._id)) {
          axios
            .post(
              `http://localhost:2002/lesson/tracking/${LXCstate.currentLesson._id}`,
              {},
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((response) => {
              console.log(response);
            });
          setComplete((pre) => {
            return [...pre, LXCstate.currentLesson._id];
          });
        }
      }
    }
  };
  return (
    <>
      <div className="Course_wrapper_video">
        <div className="Player_wrapper">
          <ReactPlayer
            controls
            width="100%"
            height="100%"
            className="React_player"
            onProgress={HandleProcess}
            url={`${LXCstate.currentLesson.video}`}
          />
        </div>
      </div>
      <h2 className="Player_title">{LXCstate.currentLesson.title}</h2>
      <p className="Player_desc">{LXCstate.currentLesson.content}</p>
    </>
  );
}
