import React from "react";
import "./Lessons.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function Lessons({ lessons, activeId, setActiveId, complete }) {
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  const handleClickLesson = (id, current_Lesson) => {
    setActiveId(id);
    dispatch({
      type: "SAVE_LESSON",
      payload: current_Lesson,
    });
  };
  return (
    <div className="lesson_list">
      {lessons?.map((lesson) => {
        return (
          <div
            className={`lesson_item ${activeId === lesson._id ? "active" : ""}`}
            key={lesson._id}
            onClick={() => handleClickLesson(lesson._id, lesson)}
          >
            <p className="lesson_title">{lesson.title}</p>
            <div className="icon_complete">
              {(complete.includes(lesson._id) ||
                lesson.completed.includes(LXCstate.auth.userId)) && (
                <FontAwesomeIcon icon={faCircleCheck} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
