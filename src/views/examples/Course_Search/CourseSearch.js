import React from "react";
import { useState, useEffect } from "react";
import UseDebounce from "./useDebounce";
import axios from "axios";
import "./CourseSearch.scss";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CourseResult from "./CourseResult";
import LoadingSearch from "components/LoadingScreen/LoadingSearch";
export default function CourseSearch() {
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const searchElement = useRef();
  const [showResult, setshowResult] = useState(false);
  const debounced = UseDebounce(searchValue, 500);
  const clickedOutside = (event) => {
    console.log(event.target);
    console.log(searchElement.current.contains(event.target));
    if (
      searchElement.current &&
      !searchElement.current.contains(event.target)
    ) {
      setshowResult(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickedOutside, true);
    return () => {
      document.removeEventListener("click", clickedOutside, true);
    };
  });
  useEffect(() => {
    console.log("hello anh em");
    if (!debounced.trim()) {
      return;
    }
    setLoading(true);
    const url = `http://localhost:2002/course/api/search?q=${encodeURIComponent(
      searchValue
    )}`;
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setsearchResult(response.data.result);
        setLoading(false);
      });
  }, [debounced]);
  const inputElement = useRef();
  return (
    <>
      <div className="search_main" ref={searchElement}>
        <div className="search_course">
          <input
            className="search_box"
            placeholder="Search Coures..."
            ref={inputElement}
            onFocus={() => setshowResult(true)}
            onChange={(e) => setsearchValue(e.target.value)}
            value={searchValue}
          ></input>
          <button className="search_button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        {showResult &&
          (loading ? (
            <LoadingSearch className="search_icon" />
          ) : (
            <div className="CourseResult_Wrapper">
              <h4 className="CourseResult_Header">Courses</h4>
              {searchResult?.map((result) => {
                return (
                  <CourseResult
                    url={result.thumbnail}
                    title={result.title}
                    key={result._id}
                    courseId={result._id}
                  />
                );
              })}
            </div>
          ))}
      </div>
    </>
  );
}
