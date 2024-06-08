import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./Project.module.css";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import CommentCard from "../../components/CommentCard/CommentCard";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [votes, setVotes] = useState({ inFavour: 0, notInFavour: 0 });
  const [vote, setVote] = useState("1");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [buttonCommentText, setButtonCommentText] = useState("Submit");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");

  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      const response = await fetch(`https://localhost:7192/api/project/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await fetch(`https://localhost:7192/api/vote/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setVotes(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://localhost:7192/api/comment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    if (project) {
      fetchVotes();
      fetchComments();
    }
  }, [project]);

  const handleVoteChange = (e) => {
    setVote(e.target.value);
  };

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Submitting");
    const voteValue = (await vote) === "1" ? true : false;
    try {
      const response = await fetch(`https://localhost:7192/api/vote/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isInFavor: voteValue,
        }),
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = `/project/${id}`;
      } else {
        setError("Either you are logged out or you have already voted");
      }
    } catch (error) {
      setError("Network Error");
    } finally {
      setButtonText("Submit");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setButtonCommentText("Submitting");
    try {
      const response = await fetch(`https://localhost:7192/api/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
        }),
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = `/project/${id}`;
      } else {
        setCommentError("Either you are logged out or your comment is empty");
      }
    } catch (error) {
      setCommentError("Network Error");
    } finally {
      setButtonCommentText("Submit");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ height: "65px" }}></div>
      {project ? (
        <>
          <div className={Styles.projectWrap}>
            <div className={Styles.projectDiv}>
              <h1>Title</h1>
              <h2>{project.title}</h2>
            </div>
            <div className={Styles.projectDiv}>
              <h1>Description</h1>
              <div
                dangerouslySetInnerHTML={{ __html: project.description }}
              ></div>
            </div>
            <div className={Styles.projectDiv}>
              <h1>Location</h1>
              <iframe
                width="700"
                height="400"
                frameborder="0"
                className={Styles.locationFrame}
                src={project.location}
              ></iframe>
            </div>
            <div className={Styles.projectDiv}>
              <h1>Votes</h1>
              <p>No. of votes in favour: {votes.inFavour}</p>
              <p>No. of votes not in favour: {votes.notInFavour}</p>
            </div>
            <div className={Styles.projectDiv}>
              <h1>Cast Your Vote</h1>
              <div className={Styles.castVoteDiv}>
                <form className={Styles.voteForm} onSubmit={handleVoteSubmit}>
                  <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleVoteChange}
                  >
                    <FormControlLabel
                      checked={vote === "1"}
                      value="1"
                      control={
                        <Radio
                          sx={{
                            color: "#dcdcdc",
                            "&.Mui-checked": { color: "#28a08c" },
                          }}
                        />
                      }
                      label="In Favour"
                    />
                    <FormControlLabel
                      checked={vote === "0"}
                      value="0"
                      control={
                        <Radio
                          sx={{
                            color: "#dcdcdc",
                            "&.Mui-checked": { color: "#28a08c" },
                          }}
                        />
                      }
                      label="Not In Favour"
                    />
                  </RadioGroup>
                  <Button
                    variant="contained"
                    type="submit"
                    disableElevation
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "#28a08c",
                      color: "#dcdcdc",
                      width: "125px",
                      fontSize: "1.2rem",
                      "&:hover": {
                        backgroundColor: "#19695b",
                      },
                    }}
                  >
                    {buttonText}
                  </Button>
                  <p className={Styles.errorp}>{error}</p>
                </form>
              </div>
            </div>

            <div className={Styles.projectDiv}>
              <h1>Write Your Thoughts</h1>
              <div>
                <form onSubmit={handleCommentSubmit}>
                  <ReactQuill
                    theme="snow"
                    value={comment}
                    onChange={setComment}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disableElevation
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "#28a08c",
                      color: "#dcdcdc",
                      width: "125px",
                      fontSize: "1.2rem",
                      "&:hover": {
                        backgroundColor: "#19695b",
                      },
                    }}
                  >
                    {buttonCommentText}
                  </Button>
                  <p className={Styles.errorp}>{commentError}</p>
                </form>
              </div>
            </div>
            <div className={Styles.projectDiv}>
              <h1>Comments</h1>
              {comments ? (
                comments.map((comment) => (
                  <CommentCard
                    key={comment.userId}
                    userId={comment.userId}
                    content={comment.content}
                  />
                ))
              ) : (
                <p>No Comments</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading projects...</p>
      )}
    </>
  );
};

export default Project;
