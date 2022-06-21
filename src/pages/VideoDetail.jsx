import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../components/Card";
import CommentTile from "../components/CommentTile";
import Container from "@material-ui/core/Container";
//components
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { routes } from "../static/routes";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
//static
import { videos } from "../static/videos";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4, 0),
  },
  videoContainer: {
    width: "100%",
    maxHeight: "500px",
    overflow: "hidden",
    background: "lightgrey",
  },
  cardContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  commentsContainer: {
    margin: theme.spacing(2, 0),
  },
  commentInput: {
    margin: theme.spacing(2, 0),
  },
}));

const VideoDetail = () => {
  const [commentValue, setCommentValue] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const data = useMemo(
    () => videos.find((item) => String(item.id) === id),
    [id]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data && data?.comments?.length) {
      setComments(data.comments);
    }
    if (data && data?.relatedVideosIds?.length) {
      const output = data.relatedVideosIds.map((id) => {
        return videos.find((item) => item.id === id);
      });
      setRelatedVideos(output);
    }
  }, [data]);

  const addComment = (value) => {
    const currentDateTime = new Date();
    const userComment = {
      name: "User",
      comment: value,
      added: `${String(currentDateTime.getHours()).padStart(2, "0")}:${String(
        currentDateTime.getMinutes()
      ).padStart(2, "0")}`,
    };
    setComments([userComment, ...comments]);
    setCommentValue("");
  };

  return (
    <>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item md={9} xs={12}>
            <Box mb={2}>
              <video
                className={classes.videoContainer}
                autoPlay={true}
                controls
              >
                <source src={data?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Box className={classes.videoInfoContainer}>
              <Typography gutterBottom variant="h5">
                {data.title}
              </Typography>
              <Typography gutterBottom component="p">
                {data.added}
              </Typography>
              <Typography gutterBottom component="p">
                {data.description}
              </Typography>
            </Box>

            <Grid container justifyContent="flex-end">
              <FormControlLabel
                control={
                  <Switch
                    checked={showComments}
                    onChange={(e) => setShowComments(e.target.checked)}
                    name="showComments"
                    color="primary"
                  />
                }
                label="Show Comments"
              />
            </Grid>

            <Grid item className={classes.commentsContainer}>
              <Grid container justifyContent="space-between">
                <Typography gutterBottom variant="h5">
                  Comments
                </Typography>
              </Grid>
              <Box>
                <TextField
                  className={classes.commentInput}
                  placeholder="Add a comment"
                  fullWidth
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addComment(event.target.value);
                    }
                  }}
                />
                <Grid container justifyContent="flex-end">
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!commentValue.length}
                    onClick={() => addComment(commentValue)}
                  >
                    Comment
                  </Button>
                </Grid>
              </Box>
              {showComments &&
                comments.length > 0 &&
                comments.map((item, index) => {
                  return <CommentTile item={item} key={index} />;
                })}
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box mb={2}>
              <Typography variant="h5">Related Videos</Typography>
            </Box>
            {relatedVideos.map((item) => {
              return (
                <Grid
                  key={item.id}
                  onClick={() => navigate(`${routes.videoDetail}/${item?.id}`)}
                  className={classes.cardContainer}
                  item
                  xs={12}
                >
                  <Card item={item} showDescription={false} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VideoDetail;
