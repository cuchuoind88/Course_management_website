import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function Lesson({
  lesson,
  nextchapter,
  activeId,
  setActiveId,
  complete,
  nextLessonId,
  unlock,
}) {
  console.log(unlock);
  console.log(lesson.unlock);
  const dispatch = useDispatch();
  const LXCstate = useSelector((state) => state);
  console.log(LXCstate.currentLesson);
  console.log(LXCstate.nextLesson);
  console.log(complete);
  const handleClickLesson = (id, current_Lesson) => {
    setActiveId(id);
    dispatch({
      type: "SAVE_LESSON",
      payload: current_Lesson,
    });
    // console.log(current_Lesson);
    if (nextLessonId === undefined) {
      if (nextchapter !== undefined) {
        dispatch({
          type: "SAVE_NEXT_LESSON",
          payload: nextchapter.lessons[0],
        });
        // console.log(nextchapter.lessons[0]);
      } else {
        dispatch({
          type: "SAVE_NEXT_LESSON",
          payload: {},
        });
      }
    } else {
      dispatch({
        type: "SAVE_NEXT_LESSON",
        payload: nextLessonId,
      });
      console.log(nextLessonId);
    }
  };
  return (
    <>
      {unlock.includes(lesson._id) ||
      lesson.unlock.includes(LXCstate.auth.userId) ? (
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
      ) : (
        <div className="lesson_item_lock" key={lesson._id}>
          <p className="lesson_title">{lesson.title}</p>
          <div className="icon_lock">
            <FontAwesomeIcon icon={faLock} />
          </div>
        </div>
      )}
    </>
  );
}
