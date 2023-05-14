import React from "react";
import { useState } from "react";
import "./Chapter.scss";
import Lessons from "./Lessons";
export default function Chapter({ chapter, activeId, setActiveId, complete }) {
  const [openChapter, setOpenChapter] = useState("");
  const toggleOpen = () => {
    setOpenChapter(!openChapter);
  };
  return (
    <>
      <div className="header_chapter" onClick={toggleOpen}>
        <h4>
          {chapter.chapterNumber} {". "} {chapter.title}
        </h4>
        <i class="tim-icons icon-minimal-down"></i>
      </div>
      {openChapter && (
        <Lessons
          complete={complete}
          lessons={chapter.lessons}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      )}
    </>
  );
}
