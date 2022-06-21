import { Link, useNavigate } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Cookie from "js-cookie";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
//components
import SearchInput from "../components/SearchInput";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//static
import { routes } from "../static/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    "& a": {
      color: "#fff",
      textDecoration: "none",
      textTransform: "capitalize",
    },
  },
  toolbar: {
    justifyContent: "space-between",
  },
  searchContainer: {
    minWidth: "350px",
    height: "100%",
  },
}));

export default function Header({ handleSearch, onClear }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("access_token");
    navigate(routes.login);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Videos Surfer</Link>
          </Typography>
          <Hidden xsDown>
            <Grid className={classes.searchContainer}>
              <SearchInput handleSearch={handleSearch} onClear={onClear} />
            </Grid>
          </Hidden>
          <Grid>
            <Button onClick={handleLogout} color="inherit">
              Log Out
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
