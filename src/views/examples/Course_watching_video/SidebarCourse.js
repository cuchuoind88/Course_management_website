import React from "react";
import "./SidebarCourse.scss";
import Chapter from "./Chapter";
import { useState } from "react";
export default function SidebarCourse({ chapters, complete }) {
  console.log(chapters);
  const [activeId, setActiveId] = useState(`${chapters[0].lessons[0]._id}`);
  return (
    <div className="chapter_wrapper">
      <h2 color="success">Nội dung khóa học</h2>
      {chapters?.map((chapter) => {
        return (
          <Chapter
            key={chapter._id}
            chapter={chapter}
            activeId={activeId}
            setActiveId={setActiveId}
            complete={complete}
          />
        );
      })}
    </div>
  );
}
