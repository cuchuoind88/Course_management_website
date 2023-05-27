import React from "react";
import "./Lessons.scss";
import Lesson from "./Lesson";
export default function Lessons({
  lessons,
  nextchapter,
  activeId,
  setActiveId,
  complete,
  unlock,
}) {
  return (
    <div className="lesson_list">
      {lessons?.map((lesson, index) => {
        return (
          <Lesson
            lesson={lesson}
            nextchapter={nextchapter}
            activeId={activeId}
            setActiveId={setActiveId}
            complete={complete}
            nextLessonId={lessons[index + 1]}
            unlock={unlock}
          />
        );
      })}
    </div>
  );
}
