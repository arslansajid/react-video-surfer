import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    marginBottom: "1rem",
    maxWidth: 345,
    minWidth: 300,
    transition: "transform 0.25s ease-in-out",
    transitionDelay: "0.2s",
    boxShadow: "rgb(93 62 188 / 9%) 0px 6px 24px",
    border: "1px solid #ededed",

    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  favorite: {
    "& svg": {
      color: red[500],
    },
  },
}));

export default function RecipeReviewCard({ item, showDescription = true }) {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { title, added, description, image, views } = item;

  const handleExpandClick = (e) => {
    setIsFavorite((prevState) => !prevState);
    e.stopPropagation();
  };

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {title[0]}
          </Avatar>
        }
        action={
          showDescription && (
            <IconButton
              className={clsx({ [classes.favorite]: isFavorite })}
              onClick={handleExpandClick}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          )
        }
        title={title}
        subheader={added}
      />
      <CardMedia
        className={classes.media}
        image={require(`../assets/images/${image}`)}
        title={title}
      />
      {showDescription && (
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {views} Views
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
