import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useRef } from "react";
import axios from "axios";
import "./Player.scss";
import Chat from "../Chat_page/Chat";
export default function Playes({ unlock, setUnlock, complete, setComplete }) {
  //Ref element
  const playerRef = useRef(null);
  const [warning, setWarning] = useState(false);
  const LXCstate = useSelector((state) => state);
  console.log(LXCstate.nextLesson);
  const previousSecond = useRef(0);
  //Close Modal
  const HandleClose = () => {
    setWarning(false);
    playerRef.current.seekTo(0);
  };
  const HandleProcess = async ({ played, playedSeconds }) => {
    console.log(previousSecond.current);
    console.log(playedSeconds);
    if (!complete.includes(LXCstate.currentLesson._id)) {
      if (playedSeconds - previousSecond.current < 200) {
        if (played >= 0.9) {
          await axios
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
          await axios
            .post(
              `http://localhost:2002/lesson/unlock/${LXCstate.nextLesson._id}`,
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
          setUnlock((pre) => {
            return [...pre, LXCstate.nextLesson._id];
          });
        }
      } else {
        setWarning(true);
      }
    }
    previousSecond.current = playedSeconds;
  };
  return (
    <>
      <div className="Course_wrapper_video">
        <div className="Player_wrapper">
          <ReactPlayer
            controls
            width="100%"
            height="100%"
            ref={playerRef}
            className="React_player"
            onProgress={HandleProcess}
            url={`${LXCstate.currentLesson.video}`}
          />
        </div>
      </div>
      <h2 className="Player_title">{LXCstate.currentLesson.title}</h2>
      <p className="Player_desc">{LXCstate.currentLesson.content}</p>
      <Chat
        lesson={LXCstate.currentLesson._id}
        username={LXCstate.auth.username}
        avatar={LXCstate.userDetails.avatar}
      />
      {/*Modal*/}
      {warning && (
        <div className="Warning_Modal">
          <div className="Warning_Modal_Overlay">
            <div className="Warning_Body">
              <div className="Warning_Header">
                <h4 className="Warning_Title">Cảnh báo</h4>
                <button className="Warning_Close" onClick={HandleClose}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle-xmark"
                    class="svg-inline--fa fa-circle-xmark "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="Warning_content_wrapper">
                <div className="Warning_content">
                  Bạn đang học nhanh hơn bình thường , vui lòng không tua quá
                  nhiểu !{" "}
                </div>
                <div className="Warning_action">
                  <Button color="warning" onClick={HandleClose}>
                    Đồng ý
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
