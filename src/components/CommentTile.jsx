import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const CommentTile = ({ item }) => {
  const classes = useStyles();
  const { name, comment, added } = item;

  return (
    <>
      <ListItem key="Alice" className={classes.activeItem}>
        <ListItemIcon>
          <Avatar
            alt="Alice"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
        </ListItemIcon>
        <ListItemText>
          <Grid container justifyContent="space-between">
            <Typography variant="body1" className="mediumFont">
              {name}
            </Typography>
            <Typography variant="body2" className={classes.greyText}>
              {added}
            </Typography>
          </Grid>
          <Typography variant="body2" className={classes.greyText}>
            {comment}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  verticalCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    display: "flex",
  },
  profileContainer: {
    padding: theme.spacing(2, 0),
    borderBottom: "1px solid rgba(38, 38, 38, 0.12)",
  },
  avatar: {
    marginRight: 15,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  bold: {
    fontWeight: "bold",
  },
  greyText: {
    fontSize: "0.8em",
    color: "#7A7979",
  },
}));

export default CommentTile;
