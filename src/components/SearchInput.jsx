import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const SearchInput = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const { handleSearch, onClear } = props;

  return (
    <TextField
      className={classes.container}
      margin="dense"
      variant="outlined"
      placeholder="Search videos ..."
      fullWidth
      value={value}
      onChange={(e) => {
        const { value } = e.target;
        setValue(value);
        if (!value.length) {
          onClear?.();
        }
      }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handleSearch(event.target.value);
        }
      }}
      InputProps={{
        classes: {
          input: classes.input,
          notchedOutline: classes.noBorder,
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton disabled className={classes.searchIcon}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <button
            className={classes.searchBtn}
            onClick={() => handleSearch(value)}
          >
            Search
          </button>
        ),
      }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: 40,
    border: "2px solid white",
    color: "white",
    position: "relative",
  },
  noBorder: {
    border: "none",
  },
  input: {
    color: "white",
    "&::placeholder": {
      color: "white",
    },
  },
  searchBtn: {
    height: "80%",
    position: "absolute",
    right: "1%",
    border: "none",
    zIndex: 1,
    background: "#fff",
  },
  searchIcon: {
    padding: "12px 12px 12px 0px",

    "& svg": {
      color: "white",
    },
  },
}));

export default SearchInput;
