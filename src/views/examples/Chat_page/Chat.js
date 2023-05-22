import React from "react";
import "./Chat.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Chat({ lesson, username, avatar }) {
  const LXCstate = useSelector((state) => state);
  console.log(LXCstate.socket);
  const [comments, setComments] = useState([]);
  const [mess, setMess] = useState("");
  const { courseId } = useParams();
  console.log(lesson);
  console.log(username);
  useEffect(() => {
    axios
      .get(`http://localhost:2002/comments/${courseId}/${lesson}/getAll`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setComments(response.data.result.comments);
      });
    LXCstate.socket.emit("join_room", { username, lesson, avatar });
    LXCstate.socket.on("receive_message", HandleNewComment);
    return () => {
      // Unsubscribe
      LXCstate.socket.emit("leave_room", lesson);
      LXCstate.socket.off("receive_message", HandleNewComment);
      setComments([]);
    };
  }, [lesson]);
  // useEffect(() => {
  //   socket.on("receive_message", HandleNewComment);
  //   //clean function
  //   return () => {
  //     socket.off("receive_message", HandleNewComment);
  //   };
  // }, []);
  const SendMessage = (mess) => {
    axios.post(
      `http://localhost:2002/comments/${courseId}/create`,
      {
        content: mess,
        lesson: lesson,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    LXCstate.socket.emit("send_message", {
      message: mess,
    });
    setMess("");
  };
  const HandleNewComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };
  return (
    <>
      <div className="Comment_wrapper">
        <h3>Comments</h3>
        <div className="input_comment">
          <div className="comment_avatar">
            <img src={`${avatar}`} alt="avatar_user" />
          </div>
          <div className="comment_right">
            <input value={mess} onChange={(e) => setMess(e.target.value)} />
            <button className="comment_btn" onClick={() => SendMessage(mess)}>
              Bình luận
            </button>
          </div>
        </div>
        <div className="comment_content_wrapper">
          {comments?.map((comment, index) => {
            return (
              <div className="Comment_content" key={index}>
                <div className="comment_content_avatar">
                  <img src={`${comment.author.avatar}`} />
                </div>
                <div className="Comment_body">
                  <h5 className="Comment_heading">{comment.author.username}</h5>
                  <p className="Content_text">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
