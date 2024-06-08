import React, { useEffect, useState } from "react";
import Styles from "./CommentCard.module.css";

const CommentCard = (props) => {
  const userId = props.userId;
  const content = props.content;

  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://localhost:7192/api/UserAdditional/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className={Styles.commentWrap}>
        <h5>{user.userName}</h5>
        <div
          className={Styles.commentDiv}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </>
  );
};

export default CommentCard;
