import React from "react";
import Styles from "./ProjectCard.module.css";
import { useNavigate } from "react-router-dom";

const ProjectCard = (props) => {
  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    const truncatedStr = str.substring(0, maxLength);
    const lastSpaceIndex = truncatedStr.lastIndexOf(" ");
    return (
      truncatedStr.substring(
        0,
        lastSpaceIndex > 0 ? lastSpaceIndex : maxLength,
      ) + "..."
    );
  };

  const navigate = useNavigate();
  const title = truncate(String(props.title), 20);
  const desc = truncate(String(props.desc), 150);
  const id = props.id;
  const url = `project/${id}`;

  const handleClick = async () => {
    navigate(url);
  };
  return (
    <div className={Styles.outer2Wrap}>
      <div onClick={handleClick} className={Styles.outerWrap}>
        <div className={Styles.innerWrap}>
          <h2>{title}</h2>
          {/* <p>{desc}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
