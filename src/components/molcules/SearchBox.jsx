import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";

export const SearchBox = (props) => {
  const { handleDrawerOpen, handleDrawerClose } = props;

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 380 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search New Insects"
        inputProps={{ "aria-label": "search new insects" }}
      />

      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleDrawerOpen}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="cancel"
        onClick={handleDrawerClose}
      >
        <Close />
      </IconButton>
    </Paper>
  );
};
