import React from "react";
import "./SidebarCourse.scss";
import Chapter from "./Chapter";
import { useState } from "react";
export default function SidebarCourse({ unlock, chapters, complete }) {
  console.log(chapters);
  const [activeId, setActiveId] = useState(`${chapters[0].lessons[0]._id}`);
  return (
    <div className="chapter_wrapper">
      <h2 color="success">Nội dung khóa học</h2>
      {chapters?.map((chapter, i) => {
        return (
          <Chapter
            key={chapter._id}
            chapter={chapter}
            nextchapter={chapters[i + 1]}
            activeId={activeId}
            setActiveId={setActiveId}
            complete={complete}
            unlock={unlock}
          />
        );
      })}
    </div>
  );
}
